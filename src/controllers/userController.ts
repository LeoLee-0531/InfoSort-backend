import { Request, Response, NextFunction } from 'express';
import {
  createUserService,
  getAllUsersService,
  getUserByLineUserIdService,
  // updateUserService, // Uncomment if/when update logic is added
  deleteUserService,
} from '../services/userService';
import { HttpError } from '../middleware/errorHandler';

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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lineUserId } = req.body;
    if (!lineUserId) {
      return next(new HttpError(400, 'lineUserId is required'));
    }
    const newUser = await createUserService(lineUserId);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByLineUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lineUserId } = req.params;
    const user = await getUserByLineUserIdService(lineUserId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lineUserId } = req.params;
    const deletedUser = await deleteUserService(lineUserId);
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    next(error);
  }
};
