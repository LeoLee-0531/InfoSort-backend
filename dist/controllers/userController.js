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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserByLineUserId = exports.getAllUsers = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - lineUserId
 *       properties:
 *         id:
 *           type: integer
 *           description: 使用者ID (自動產生)
 *         lineUserId:
 *           type: string
 *           description: 使用者的 LINE User ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 使用者建立時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 使用者最後更新時間
 *       example:
 *         id: 1
 *         lineUserId: "U1234567890abcdef1234567890abcdef"
 *         createdAt: "2025-06-02T10:00:00.000Z"
 *         updatedAt: "2025-06-02T10:00:00.000Z"
 *   requestBodies:
 *     UserBody:
 *       description: 建立新使用者的請求內容
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
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lineUserId } = req.body;
        if (!lineUserId) {
            return next(new errorHandler_1.HttpError(400, 'lineUserId is required'));
        }
        const newUser = yield (0, userService_1.createUserService)(lineUserId);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByLineUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lineUserId } = req.params;
        const user = yield (0, userService_1.getUserByLineUserIdService)(lineUserId);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByLineUserId = getUserByLineUserId;
/* // Uncomment if/when update logic is added
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lineUserId } = req.params;
    const user = await updateUserService(lineUserId, req.body);
    if (!user) {
      return next(new HttpError(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
*/
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lineUserId } = req.params;
        const deletedUser = yield (0, userService_1.deleteUserService)(lineUserId);
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
