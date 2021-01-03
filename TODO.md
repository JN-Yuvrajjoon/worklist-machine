## LOGIC
- Program the scheduling engine

## SCRAPER
- Program the scraper that takes course website data and stores it in the database. 
- Get the scraper to ask whether a course is full/blocked/restricted, show restrictions, show comments

## MISC BACKEND/MIDDLEWARE
- Remove axios
- Remove Mongoose?
- Make sure courses can fit into mongoDB, both size-wise and number of documents. (might exceed 5000 limit) -> Don't store 500+ level courses?

## MISC FRONTEND
- Remove Component states where they're not necessarry
- CoursesMenu: enable addition/deletion of custom blocks
- CoursesMenu: Make course detail expand/collapse relative to itself, and not its position in the list
- CoursesMenu: Make new courses appear at the top of the list
- AboutMenu: add links

- WorklistRendering: Calculate height of one row based on the screen size and number of rows?

## MISC
- Make the logo |.| |'|

## FOR LATER
- Warn users if the distance between two consecutive classes is long enough (maps API) (should only search a small radius, not the whole world)
- Deploy (frontend): https://facebook.github.io/create-react-app/docs/deployment