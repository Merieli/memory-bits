# ROADMAP

All tasks of memory bits.

### Done ✅

- [x] Login page ~3d #feat
  - [x] User can click a button to start the game. When this button is clicked, a timer will start
- [x] Game page ~10d #feat
  - [x] Card component ~1d #feat
  - [x] Header component ~4d #feat
  - [x] Logic of game ~10d #feat
    - [x] Create action to search for cards to display according to the difficulty level selected by the user
    - [x] User can see a grid with n x n cards (n is an integer). All the cards are faced down initially (hidden state)
    - [x] The user can click on any card to reveal the image below it (change it to visible state). The image will be displayed until the user clicks on a second card
    - [x] Observe the end of the match to save a match in the database
- [x] Game over page ~1d #feat
- [x] Win page ~1d #feat
- [x] Create action to validate user existence in the database, if it exists, pull data from it, if not, create a new user
- [x] Create endpoint to get all matchs by user id ~1d #feat
- [x] Create endpoint to put match ~1d #feat
- [x] Create endpoint to get cards by level ~1d #feat
- [x] Create endpoint to post user ~1d #feat
- [x] Create endpoint to get user by name ~1d #feat
- [x] Create endpoint to get user by id ~1d #feat
- [x] Create endpoint to post matchs ~1d #feat
- [x] Create endpoint to get matchs ~1d #feat
- [x] Create endpoint to get cards by group name ~1d #feat
- [x] Create endpoint to get cards by group id ~1d #feat
- [x] Prepare Prisma database #feat [31/03/24->31/03/24]
- [x] Add libraries to project
- [x] Insert images in database [27/03/24->27/03/24]
- [x] Register images in CDN [23/03/24->27/03/24]
- [x] Docker to database
