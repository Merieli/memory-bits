# ROADMAP

All tasks of memory bits.

- [ ] Library of components ~3d #feat
- [ ] Create container docker for project [31/02/24->??/??/24]
- [ ] Login page ~3d #feat
  - [x] User can click a button to start the game. When this button is clicked, a timer will start
- [ ] Game page ~10d #feat
  - [ ] Card component ~1d #feat
  - [ ] Header component ~4d #feat
  - [ ] Logic of game ~10d #feat
    - [ ] Create action to search for cards to display according to the difficulty level selected by the user
    - [ ] User can see a grid with n x n cards (n is an integer). All the cards are faced down initially (hidden state)
    - [ ] O usuário pode clicar em qualquer cartão para revelar a imagem que está abaixo dele (alterá-la para o estado visível). A imagem será exibida até que o usuário clique em um segundo cartão
    - [ ] Observe the end of the match to save a match in the database
- [ ] Game over page ~1d #feat


### Done ✅

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
