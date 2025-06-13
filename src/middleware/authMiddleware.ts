import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from './errorHandler';

const JWT_SECRET = process.env.JWT_SECRET;

// 擴展 Express 的 Request 型別，使其包含 user 屬性
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string; // 這個屬性將儲存 lineUserId
    // 如果需要，可以在這裡從資料庫添加其他使用者屬性
  };
}

// JWT 權杖的 payload 介面
interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // 從 Authorization 標頭讀取 JWT（格式：Bearer <token>）
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new HttpError(401, 'Authorization 標頭缺失或格式錯誤'));
    }

    const token = authHeader.substring(7).trim(); // 移除 "Bearer " 前綴並清理空白

    if (!token || token === '') {
      return next(new HttpError(401, 'JWT 缺失'));
    }

    // 驗證 JWT 權杖（這裡不需要查詢資料庫！）
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return next(new HttpError(500, 'JWT Secret 未設置'));
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    
    // 驗證 payload 是否有必要的欄位
    if (!decoded.userId) {
      return next(new HttpError(401, '無效的 JWT 權杖 - 缺少使用者資訊'));
    }
    
    // 將使用者資訊附加到請求物件上
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error); // Add logging
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new HttpError(401, '無效的 JWT 權杖'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new HttpError(401, 'JWT 權杖已過期'));
    }
    next(error);
  }
};
