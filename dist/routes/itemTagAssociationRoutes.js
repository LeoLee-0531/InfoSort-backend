"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/itemTagAssociationRoutes.ts
const express_1 = require("express");
const itemTagAssociationController_1 = require("../controllers/itemTagAssociationController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: ItemTagAssociations
 *   description: 資訊項目與標籤關聯管理 API
 */
/**
 * @swagger
 * /api/item-tag-associations:
 *   post:
 *     summary: 為資訊項目加入標籤 (建立關聯)
 *     tags: [ItemTagAssociations]
 *     requestBody:
 *       $ref: '#/components/requestBodies/ItemTagAssociationBody'
 *     responses:
 *       201:
 *         description: 成功建立關聯
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemTagAssociation'
 *       400:
 *         description: 請求格式錯誤 (例如缺少 itemId 或 tagId)
 *       409:
 *         description: 此標籤已與此項目關聯 (唯一性衝突)
 *       500:
 *         description: 伺服器內部錯誤
 */
router.post('/', itemTagAssociationController_1.itemTagAssociationController.addTagToItem);
/**
 * @swagger
 * /api/item-tag-associations/{itemId}/{tagId}:
 *   delete:
 *     summary: 從資訊項目移除標籤 (刪除關聯)
 *     tags: [ItemTagAssociations]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: 資訊項目的 ID
 *       - in: path
 *         name: tagId
 *         schema:
 *           type: string
 *         required: true
 *         description: 標籤的 ID
 *     responses:
 *       204:
 *         description: 成功刪除關聯 (無內容)
 *       404:
 *         description: 找不到該關聯
 *       500:
 *         description: 伺服器內部錯誤
 */
router.delete('/:itemId/:tagId', itemTagAssociationController_1.itemTagAssociationController.removeTagFromItem);
/**
 * @swagger
 * /api/item-tag-associations/item/{itemId}/tags:
 *   get:
 *     summary: 取得特定資訊項目的所有標籤
 *     tags: [ItemTagAssociations]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: 資訊項目的 ID
 *     responses:
 *       200:
 *         description: 成功取得標籤列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       404:
 *         description: 找不到該資訊項目
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/item/:itemId/tags', itemTagAssociationController_1.itemTagAssociationController.getTagsForItem);
/**
 * @swagger
 * /api/item-tag-associations/tag/{tagId}/items:
 *   get:
 *     summary: 取得帶有特定標籤的所有資訊項目
 *     tags: [ItemTagAssociations]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         schema:
 *           type: string
 *         required: true
 *         description: 標籤的 ID
 *     responses:
 *       200:
 *         description: 成功取得資訊項目列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InformationItem'
 *       404:
 *         description: 找不到該標籤
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/tag/:tagId/items', itemTagAssociationController_1.itemTagAssociationController.getItemsWithTag);
exports.default = router;
