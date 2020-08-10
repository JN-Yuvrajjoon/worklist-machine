- Finish this list, make sure the frontend-backend connection still works, then start a new branch.
- Set up testing

## LOGIC
- Program the worklist generator that takes in course names, retreives Course documents from mongoDB, and outputs several worklists (collections of sections) (+ links, possibly)

## SCRAPER
- Program the scraper that takes course website data and stores it in the database. This might be a separate program.
- Get the scraper to ask whether a course is full/blocked/restricted, show restrictions, show comments

## MISC FRONTEND
- Design UI/UX + colour scheme
- Create UI/UX using React components

## MISC BACKEND/MIDDLEWARE
- Remove axios
- Remove Mongoose?

## MISC
- Create a way to start frontend and backend in one terminal command
- Make a logo
- npm prune to get rid of unnecessary node-modules

## FOR LATER
- Warn users if the distance between two consecutive classes is long enough (maps API) (should only search a small radius, not the whole world)