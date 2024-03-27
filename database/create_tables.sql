CREATE DATABASE IF NOT EXISTS memory_game;

USE memory_game;

CREATE TABLE users(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,

    CONSTRAINT username_unique__users UNIQUE (username)
);

CREATE TABLE levels(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,

    CONSTRAINT name_unique__levels UNIQUE (name)
);

CREATE TABLE groups_of_cards(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    fk_groups_of_cards__levels__id INT NOT NULL,

    CONSTRAINT name_unique__groups_of_cards UNIQUE (name),
    CONSTRAINT fk_required_level 
        FOREIGN KEY (fk_groups_of_cards__levels__id) REFERENCES `levels` (id)
);

CREATE TABLE cards(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    image_url TEXT NOT NULL,
    fk_cards__groups_of_cards__id INT NOT NULL,

    CONSTRAINT fk_groups_of_cards__cards 
        FOREIGN KEY (fk_cards__groups_of_cards__id) REFERENCES `groups_of_cards` (id)
);

CREATE TABLE matchs( 
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    attempts SMALLINT,
    score INT(11) NOT NULL,
    time FLOAT(6,2),
    fk_matchs__users__id INT,
    fk_matchs__levels__id INT,
    fk_matchs__groups_of_cards__id INT,
    
    CONSTRAINT fk_user__matchs 
        FOREIGN KEY (fk_matchs__users__id) REFERENCES `users` (id),
    CONSTRAINT fk_level__matchs 
        FOREIGN KEY (fk_matchs__levels__id) REFERENCES `levels` (id),
    CONSTRAINT fk_groups_of_cards__matchs 
        FOREIGN KEY (fk_matchs__groups_of_cards__id) REFERENCES `groups_of_cards` (id)
);
