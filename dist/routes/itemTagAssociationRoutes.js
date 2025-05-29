"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/itemTagAssociationRoutes.ts
const express_1 = require("express");
const itemTagAssociationController_1 = require("../controllers/itemTagAssociationController");
const router = (0, express_1.Router)();
router.post('/', itemTagAssociationController_1.itemTagAssociationController.addTagToItem);
router.delete('/:itemId/:tagId', itemTagAssociationController_1.itemTagAssociationController.removeTagFromItem);
router.get('/item/:itemId/tags', itemTagAssociationController_1.itemTagAssociationController.getTagsForItem);
router.get('/tag/:tagId/items', itemTagAssociationController_1.itemTagAssociationController.getItemsWithTag);
exports.default = router;
