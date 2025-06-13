import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByLineUserIdService } from '../services/userService';
import { HttpError } from '../middleware/errorHandler';

const JWT_SECRET: string = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT 權杖
 *         user:
 *           $ref: '#/components/schemas/User'
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           id: 1
 *           lineUserId: "U1234567890abcdef1234567890abcdef"
 *           createdAt: "2025-06-02T10:00:00.000Z"
 *           updatedAt: "2025-06-02T10:00:00.000Z"
 *   requestBodies:
 *     LoginBody:
 *       description: 登入請求內容
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lineUserId
 *             properties:
 *               lineUserId:
 *                 type: string
 *                 description: 使用者的 LINE User ID
 *                 example: "U1234567890abcdef1234567890abcdef"
 */

export const authController = {
  // 登入端點 - 驗證 LINE User ID 並簽發 JWT
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lineUserId } = req.body;

      if (!lineUserId || typeof lineUserId !== 'string' || lineUserId.trim() === '') {
        return next(new HttpError(400, 'LINE User ID 是必填欄位且必須為有效字串'));
      }

      // 驗證使用者是否存在於資料庫中（只在登入時驗證一次）
      const user = await getUserByLineUserIdService(lineUserId.trim());
      
      // 檢查使用者是否存在（雖然 getUserByLineUserIdService 會拋出錯誤，但為了型別安全）
      if (!user) {
        return next(new HttpError(401, '無效的 LINE User ID 或使用者不存在'));
      }
      
      // 建立 JWT payload
      const payload = {
        userId: user.lineUserId,
        iat: Math.floor(Date.now() / 1000) // 簽發時間
      };

      // 簽發 JWT
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

      res.status(200).json({
        token,
        user: {
          id: user.lineUserId,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Auth login error:', error); // Add logging
      if (error instanceof HttpError && error.status === 404) {
        return next(new HttpError(401, '無效的 LINE User ID 或使用者不存在'));
      }
      next(error);
    }
  }
};
