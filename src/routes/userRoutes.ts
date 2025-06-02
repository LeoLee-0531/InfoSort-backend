import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserByLineUserId,
  // updateUser, // Uncomment if/when update logic is added
  deleteUser,
} from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 使用者管理相關 API
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: 建立新使用者
 *     tags: [Users]
 *     requestBody:
 *       $ref: '#/components/requestBodies/UserBody'
 *     responses:
 *       201:
 *         description: 成功建立使用者
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: 請求格式錯誤 (例如缺少 lineUserId)
 *       500:
 *         description: 伺服器內部錯誤
 */
router.post('/', createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 取得所有使用者列表
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 成功取得使用者列表
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/users/{lineUserId}:
 *   get:
 *     summary: 透過 LINE User ID 取得特定使用者
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: lineUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: 使用者的 LINE User ID
 *     responses:
 *       200:
 *         description: 成功取得使用者資訊
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 找不到該使用者
 *       500:
 *         description: 伺服器內部錯誤
 */
router.get('/:lineUserId', getUserByLineUserId);
// router.put('/:lineUserId', updateUser); // Uncomment if/when update logic is added

/**
 * @swagger
 * /api/users/{lineUserId}:
 *   delete:
 *     summary: 透過 LINE User ID 刪除特定使用者
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: lineUserId
 *         schema:
 *           type: string
 *         required: true
 *         description: 使用者的 LINE User ID
 *     responses:
 *       200:
 *         description: 成功刪除使用者
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: 找不到該使用者
 *       500:
 *         description: 伺服器內部錯誤
 */
router.delete('/:lineUserId', deleteUser);

export default router;
