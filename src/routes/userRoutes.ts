import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUserByLineUserId,
  // updateUser, // Uncomment if/when update logic is added
  deleteUser,
} from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:lineUserId', getUserByLineUserId);
// router.put('/:lineUserId', updateUser); // Uncomment if/when update logic is added
router.delete('/:lineUserId', deleteUser);

export default router;
