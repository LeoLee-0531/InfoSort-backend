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
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
const errorHandler_1 = require("../middleware/errorHandler");
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
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
exports.authController = {
    // 登入端點 - 驗證 LINE User ID 並簽發 JWT
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { lineUserId } = req.body;
            if (!lineUserId) {
                return next(new errorHandler_1.HttpError(400, 'LINE User ID 是必填欄位'));
            }
            // 驗證使用者是否存在於資料庫中（只在登入時驗證一次）
            const user = yield (0, userService_1.getUserByLineUserIdService)(lineUserId);
            // 檢查使用者是否存在（雖然 getUserByLineUserIdService 會拋出錯誤，但為了型別安全）
            if (!user) {
                return next(new errorHandler_1.HttpError(401, '無效的 LINE User ID 或使用者不存在'));
            }
            // 建立 JWT payload
            const payload = {
                userId: user.lineUserId,
                iat: Math.floor(Date.now() / 1000) // 簽發時間
            };
            // 簽發 JWT
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            res.status(200).json({
                token,
                user: {
                    id: user.lineUserId,
                    createdAt: user.createdAt
                }
            });
        }
        catch (error) {
            if (error instanceof errorHandler_1.HttpError && error.status === 404) {
                return next(new errorHandler_1.HttpError(401, '無效的 LINE User ID 或使用者不存在'));
            }
            next(error);
        }
    })
};
