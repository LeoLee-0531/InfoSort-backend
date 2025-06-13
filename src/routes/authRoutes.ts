import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 身份驗證相關 API
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 使用 LINE User ID 登入並獲取 JWT
 *     tags: [Auth]
 *     requestBody:
 *       $ref: '#/components/requestBodies/LoginBody'
 *     responses:
 *       200:
 *         description: 登入成功，返回 JWT 權杖
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: 請求格式錯誤 (例如缺少 lineUserId)
 *       401:
 *         description: 無效的 LINE User ID 或使用者不存在
 *       500:
 *         description: 伺服器內部錯誤
 */
router.post('/login', authController.login);

export default router;
