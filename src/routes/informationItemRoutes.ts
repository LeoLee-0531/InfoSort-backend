import { Router } from 'express';
import { informationItemController } from '../controllers/informationItemController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: InformationItems
 *   description: 資訊項目管理相關 API
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: 取得所有資訊項目列表 (可選用 userId 過濾)
 *     tags: [InformationItems]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: 用戶的 ID，用於過濾特定用戶的資訊項目
 *     responses:
 *       200:
 *         description: 成功取得資訊項目列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InformationItem'
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/', informationItemController.getAllItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: 透過 ID 取得特定資訊項目
 *     tags: [InformationItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 資訊項目的 ID
 *     responses:
 *       200:
 *         description: 成功取得資訊項目資訊
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformationItem'
 *       404:
 *         description: 找不到該資訊項目
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/:id', informationItemController.getItemById);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: 建立新的資訊項目
 *     tags: [InformationItems]
 *     requestBody:
 *       $ref: '#/components/requestBodies/InformationItemBody'
 *     responses:
 *       201:
 *         description: 成功建立資訊項目
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformationItem'
 *       400:
 *         description: 請求格式錯誤 (例如缺少必要欄位)
 *       500:
 *         description: 伺服器內部錯誤
 */
router.post('/', informationItemController.createItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: 透過 ID 更新特定資訊項目
 *     tags: [InformationItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 資訊項目的 ID
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateInformationItemBody'
 *     responses:
 *       200:
 *         description: 成功更新資訊項目
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InformationItem'
 *       400:
 *         description: 請求格式錯誤
 *       404:
 *         description: 找不到該資訊項目
 *       500:
 *         description: 伺服器內部錯誤
 */
router.put('/:id', informationItemController.updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: 透過 ID 刪除特定資訊項目
 *     tags: [InformationItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 資訊項目的 ID
 *     responses:
 *       204:
 *         description: 成功刪除資訊項目 (無內容)
 *       404:
 *         description: 找不到該資訊項目
 *       500:
 *         description: 伺服器內部錯誤
 */
router.delete('/:id', informationItemController.deleteItem);

/**
 * @swagger
 * /api/items/type/{type}:
 *   get:
 *     summary: 透過類型取得資訊項目列表 (可選用 userId 過濾)
 *     tags: [InformationItems]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: 資訊項目的類型
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: 用戶的 ID，用於過濾特定用戶的資訊項目
 *     responses:
 *       200:
 *         description: 成功取得資訊項目列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InformationItem'
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/type/:type', informationItemController.getItemsByType);

export default router;