import * as cards from "~/server/controllers/cards";
import * as group_of_cards from "~/server/controllers/group_of_cards";
import * as levels from "~/server/controllers/levels";
import * as matchs from "~/server/controllers/matchs";

const routerV1 = createRouter();

routerV1.get('/cards', defineEventHandler(cards.handleGet));
routerV1.get('/cards/:id', defineEventHandler(cards.findById));
routerV1.post('/cards', defineEventHandler(cards.create));
routerV1.delete('/cards/:id', defineEventHandler(cards.deleteById));


routerV1.get('/group_of_cards', defineEventHandler(group_of_cards.findAll));
routerV1.get('/group_of_cards/:name', defineEventHandler(group_of_cards.findByName));


routerV1.get('/levels', defineEventHandler(levels.findAllLevels));


routerV1.get('/matchs', defineEventHandler(matchs.findAll));
routerV1.post('/matchs', defineEventHandler(matchs.create));

export default useBase('/api/v1', routerV1.handler)
