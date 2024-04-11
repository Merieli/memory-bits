import * as cards from "~/server/controllers/cards";
import * as group_of_cards from "~/server/controllers/group_of_cards";
import * as levels from "~/server/controllers/levels";
import * as matchs from "~/server/controllers/matchs";

const router = createRouter();

router.get('/cards', defineEventHandler(cards.handleGet));
router.get('/cards/:id', defineEventHandler(cards.findById));

router.post('/cards', defineEventHandler(cards.create));
router.delete('/cards/:id', defineEventHandler(cards.deleteById));


router.get('/group_of_cards', defineEventHandler(group_of_cards.findAll));
router.get('/group_of_cards/:name', defineEventHandler(group_of_cards.findByName));


router.get('/levels', defineEventHandler(levels.findAllLevels));

router.get('/matchs', defineEventHandler(matchs.findAll));

export default useBase('/api/v1', router.handler)
