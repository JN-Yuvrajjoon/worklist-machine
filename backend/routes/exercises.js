const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Handles incoming get requests
// .find gets all the users from the mongoDB database
router.route("/").get((req, res) => {
	Exercise.find()
	.then(exercises => res.json(exercises))
	.catch(err => res.status(400).json("Error: " + err));
});

// Handles incoming post requests
// Adds a new user
router.route("/add").post((req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newExercise = new Exercise({
		username,
		description,
		duration,
		date,
	});

	newExercise.save()
	.then(() => res.json("Exercise added!"))
	.catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;