-- CREATE DATABASE IF NOT EXISTS `marvel` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE DATABASE IF NOT EXISTS memory_game;

USE memory_game;

CREATE TABLE users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,

    CONSTRAINT username_unique UNIQUE (username)
);

CREATE TABLE levels(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,

    CONSTRAINT name_unique UNIQUE (name)
);

CREATE TABLE groups_of_cards(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    fk_groups_of_cards__levels__id INT,

    CONSTRAINT name_unique UNIQUE (name),
    CONSTRAINT fk_required_level FOREIGN KEY (fk_groups_of_cards__levels__id) REFERENCES `levels` (id)
);

CREATE TABLE cards(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    image_url TEXT NOT NULL,
    fk_cards__groups_of_cards__id INT,

    CONSTRAINT fk_groups_of_cards FOREIGN KEY (fk_cards__groups_of_cards__id) REFERENCES `groups_of_cards` (id)
);


CREATE TABLE `matchs`( #match entre template string porque a palavra é reservada no sql e é preciso escapar
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    attempts SMALLINT,
    score INT(11) NOT NULL,
    time FLOAT(6,2),
    fk_matchs__users__id INT,
    fk_matchs__levels__id INT,
    fk_matchs__groups_of_cards__id INT,
    
    CONSTRAINT fk_user FOREIGN KEY (fk_matchs__users__id) REFERENCES `User` (id),
    CONSTRAINT fk_level FOREIGN KEY (fk_matchs__levels__id) REFERENCES `Level` (id),
    CONSTRAINT fk_groups_of_cards FOREIGN KEY (fk_matchs__groups_of_cards__id) REFERENCES `groups_of_cards` (id)
);