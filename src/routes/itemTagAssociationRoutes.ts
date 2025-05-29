// src/routes/itemTagAssociationRoutes.ts
import { Router } from 'express';
import { itemTagAssociationController } from '../controllers/itemTagAssociationController';

const router = Router();

router.post('/', itemTagAssociationController.addTagToItem);
router.delete('/:itemId/:tagId', itemTagAssociationController.removeTagFromItem);
router.get('/item/:itemId/tags', itemTagAssociationController.getTagsForItem);
router.get('/tag/:tagId/items', itemTagAssociationController.getItemsWithTag);

export default router;