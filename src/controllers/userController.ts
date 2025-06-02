import { Request, Response, NextFunction } from 'express';
import {
  createUserService,
  getAllUsersService,
  getUserByLineUserIdService,
  // updateUserService, // Uncomment if/when update logic is added
  deleteUserService,
} from '../services/userService';
import { HttpError } from '../middleware/errorHandler';

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
