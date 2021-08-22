const express = require('express');
const cors = require('cors');
const db = require('./connection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.all('/', function (req, res, next) {
  res.send({ message: 'worklist machine API!!!' });
})

app.get('/schools', function (req, res, next) {
  db.wakeDb().then(mongo => {
    return mongo.db().admin().listDatabases({
      listDatabases: 1,
      nameOnly: true,
    });
  }).then(doc => {
    res.send({
      schools: doc.databases
        .filter(sch => sch.name.startsWith(db.schoolPrefix))
        .map(sch => ({
          dbName: sch.name,
          name: sch.name.slice(db.schoolPrefix.length)
          // todo: valid semester list
        }))
    });
  }).catch(next);
});

app.get('/:school/sessions', function (req, res, next) {
  db.wakeDb().then(mongo => {
    return mongo.db(db.schoolPrefix + req.params.school).listCollections().toArray();
  }).then(resp => {
    res.send({
      school: req.params.school,
      sessions: resp.map(ses => ({ name: ses.name }))
    });
  }).catch(next);
});

/**
 * maybe make this a get with a fat query string idk
 * @param req.params.school db name minus prefix, e.g. 'ubc-vancouver'
 * @param req.params.session collection name
 * @param {name: string, section?: string}[] req.body.courses
 * @todo filter sections using section + semester input
 */
app.post('/:school/:session/courses', function (req, res, next) {
  // const query = {
  //   name: { $in: req.body.courses.map(c => c.name) }
  // }
  // const projection = {
  //   // todo: use this to include only necessary fields
  // }
  // db.wakeDb().then(mongo => {
  //   return mongo.db(db.schoolPrefix + req.params.school)
  //     .collection(req.params.session)
  //     .find(query)
  //     .toArray()
  //     .then(x => {
  //       console.log(x.length)
  //       res.send(x);
  //     })
  // }).catch(next);

  // inefficient way of dealing with the space between dept name and course code
  const aggPipeline = [
    {
      $addFields: {
        name: {
          $replaceAll: {
            input: "$name",
            find: " ",
            replacement: ""
          }
        }
      }
    },
    {
      $match: {
        name: {
          $in: req.body.courses.map(c => c.name)
        }
      }
    }
  ];

  db.wakeDb().then(mongo => {
    return mongo.db(db.schoolPrefix + req.params.school)
      .collection(req.params.session)
      .aggregate(aggPipeline).toArray().then(courses => {
        res.send({ courses: courses.map(c => formatSchedule(c)) });
      });
  }).catch(next);
})

// todo just store it this way instead of doing fat processing
function formatSchedule(course) {
  return {
    ...course,
    sections: course.sections.map(sec => ({
      ...sec,
      schedule: sec.schedule.reduce((dayblocksets, block) => {
        const day = block.day.toLowerCase();
        newblock = {
          // term: block.term,
          startTime: parseInt(block.start_time.replace(':', ''), 10),
          endTime: parseInt(block.end_time.replace(':', ''), 10),
          // building: block.building,
          // room: block.room,
          // term: block.term,
        };

        // Generally no multi-block days, but maybe.
        let dbs = dayblocksets.find(d => d.term === block.term);
        if (!dbs) {
          dbs = { term: block.term };
          dayblocksets.push(dbs);
        }
        let target = dbs[day] || [];
        const spot = target.findIndex(block => block.start_time >= newblock.start_time);
        target.splice(spot === -1 ? 0 : spot - 1, 0, newblock);
        dbs[day] = target;
        return dayblocksets;
      }, [])
    }))
  }
}

/**
 * error handler called on .catch(next)
 */
app.use(function (err, req, res, next) {
  console.error(err);
  process.env.DEV ?
    res.status(500).json({ error: err, stack: err.stack })
    : res.status(500).send({ error: 'Error in server.js!' })
});

// Starts the server
app.listen(port, function () {
  console.log(`Server is running on port: ${port}`);
});
