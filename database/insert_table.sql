-- Popular tabela de usuários
INSERT INTO users (username) VALUES ('admin');

-- Popular tabela de níveis
INSERT INTO levels (name) VALUES ('Easy');
INSERT INTO levels (name) VALUES ('Medium');
INSERT INTO levels (name) VALUES ('Hard');

-- Popular tabela de groups_of_cards
INSERT INTO groups_of_cards (name) VALUES ('mario'); 
INSERT INTO groups_of_cards (name) VALUES ('tibia');

-- -- Popular tabela de cards
-- INSERT INTO cards (image, fk_cards__groups_of_cards__id) VALUES ('mario.svg', 1); 
-- INSERT INTO cards (image, fk_cards__groups_of_cards__id ) VALUES ('egg.svg', 1);
