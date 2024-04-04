import * as cards from "~/server/controllers/cards";
import * as group_of_cards from "~/server/controllers/group_of_cards";
import * as levels from "~/server/controllers/levels";

const router = createRouter();

router.get('/cards', defineEventHandler(cards.findAll));
router.get('/cards/:id', defineEventHandler(cards.findById));
router.get('/cards/group/:id', defineEventHandler(cards.findByGroupId));
router.get('/cards/group_name/:group_name', defineEventHandler(cards.findByGroupName));

router.get('/group_of_cards', defineEventHandler(group_of_cards.findAll));
router.get('/group_of_cards/:name', defineEventHandler(group_of_cards.findByName));

router.get('/levels', defineEventHandler(levels.findAllLevels));

export default useBase('/api/v1', router.handler)
