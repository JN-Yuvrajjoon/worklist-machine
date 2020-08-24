## LOGIC
- Program the worklist generator that takes in course names, retreives Course documents from mongoDB, and outputs several worklists (collections of sections) (+ links, possibly)

## SCRAPER
- Program the scraper that takes course website data and stores it in the database. 
- Get the scraper to ask whether a course is full/blocked/restricted, show restrictions, show comments

## MISC BACKEND/MIDDLEWARE
- Remove axios
- Remove Mongoose?
- Make sure courses can fit into mongoDB, both size-wise and number of documents. (might exceed 5000 limit)

## MISC FRONTEND
- CoursesMenu: enable deletion of courses
- CoursesMenu: enable addition/deletion of custom blocks
- CoursesMenu: Make new courses appear at the top of the list
- AboutMenu: add links

- WorklistRendering: Calculate height of one row based on the screen size and number of rows?
- Write functions that sort a Worklist's data into day-sorted arrays of blocks

## MISC
- Make the logo

## FOR LATER
- Warn users if the distance between two consecutive classes is long enough (maps API) (should only search a small radius, not the whole world)
- Deploy (frontend): https://facebook.github.io/create-react-app/docs/deployment