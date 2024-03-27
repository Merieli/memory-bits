-- Popular tabela de usuários
INSERT INTO users (username) VALUES ('admin');

-- Popular tabela de níveis
INSERT INTO levels (name) VALUES ('Easy');
INSERT INTO levels (name) VALUES ('Medium');
INSERT INTO levels (name) VALUES ('Hard');

-- Popular tabela de groups_of_cards
INSERT INTO groups_of_cards (name, fk_groups_of_cards__levels__id) 
    VALUES ('mario', 1); 
INSERT INTO groups_of_cards (name, fk_groups_of_cards__levels__id) 
    VALUES ('tibia', 3);

-- -- Popular tabela de cards
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id) 
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/mario.svg', 
        1
    ); 
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id ) 
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/block.svg', 
        1
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/cherry.svg', 
        1
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/egg.svg', 
        1
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/emerald.svg', 
        1
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/petey.svg', 
        1
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/rainbow-star.svg', 
        1
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/star.svg', 
        1
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/mario/toad.svg', 
        1
    );

INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/emerald-green.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/glove.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/hood.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/staff-purple.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/stone-green.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/stone-purple.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/sword-blue.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/sword-green.svg', 
        2
    );
INSERT INTO cards (image_url, fk_cards__groups_of_cards__id )
    VALUES (
        'https://cdn.statically.io/gh/Merieli/memory-bits/main/images/tibia/sword-purple.svg', 
        2
    );
