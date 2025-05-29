import { Router } from 'express';
import { informationItemController } from '../controllers/informationItemController';

const router = Router();

router.get('/', informationItemController.getAllItems);
router.get('/:id', informationItemController.getItemById);
router.post('/', informationItemController.createItem);
router.put('/:id', informationItemController.updateItem);
router.delete('/:id', informationItemController.deleteItem);
router.get('/type/:type', informationItemController.getItemsByType);

export default router;