"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("./errorHandler");
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 從 Authorization 標頭讀取 JWT（格式：Bearer <token>）
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new errorHandler_1.HttpError(401, 'Authorization 標頭缺失或格式錯誤'));
        }
        const token = authHeader.substring(7); // 移除 "Bearer " 前綴
        if (!token) {
            return next(new errorHandler_1.HttpError(401, 'JWT 權杖缺失'));
        }
        // 驗證 JWT 權杖（這裡不需要查詢資料庫！）
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // 將使用者資訊附加到請求物件上
        req.user = { id: decoded.userId };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new errorHandler_1.HttpError(401, '無效的 JWT 權杖'));
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new errorHandler_1.HttpError(401, 'JWT 權杖已過期'));
        }
        next(error);
    }
});
exports.authMiddleware = authMiddleware;
