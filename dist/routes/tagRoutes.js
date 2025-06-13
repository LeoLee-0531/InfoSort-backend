"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagController_1 = require("../controllers/tagController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: 標籤管理相關 API
 */
/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: 取得所有標籤列表
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: 成功取得標籤列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/', tagController_1.tagController.getAllTags);
/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: 透過 ID 取得特定標籤
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 標籤的 ID
 *     responses:
 *       200:
 *         description: 成功取得標籤資訊
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: 找不到該標籤
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/:id', tagController_1.tagController.getTagById);
/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: 建立新的標籤
 *     tags: [Tags]
 *     requestBody:
 *       $ref: '#/components/requestBodies/TagBody'
 *     responses:
 *       201:
 *         description: 成功建立標籤
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: 請求格式錯誤 (例如缺少名稱)
 *       409:
 *         description: 標籤名稱已存在
 *       500:
 *         description: 伺服器內部錯誤
 */
router.post('/', tagController_1.tagController.createTag);
/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     summary: 透過 ID 更新特定標籤
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 標籤的 ID
 *     requestBody:
 *       $ref: '#/components/requestBodies/TagBody'
 *     responses:
 *       200:
 *         description: 成功更新標籤
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: 請求格式錯誤
 *       404:
 *         description: 找不到該標籤
 *       409:
 *         description: 更新後的標籤名稱已存在 (用於不同的標籤 ID)
 *       500:
 *         description: 伺服器內部錯誤
 */
router.put('/:id', tagController_1.tagController.updateTag);
/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: 透過 ID 刪除特定標籤
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 標籤的 ID
 *     responses:
 *       204:
 *         description: 成功刪除標籤 (無內容)
 *       404:
 *         description: 找不到該標籤
 *       500:
 *         description: 伺服器內部錯誤
 */
router.delete('/:id', tagController_1.tagController.deleteTag);
exports.default = router;
