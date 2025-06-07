import { Request, Response, NextFunction, RequestHandler } from 'express';
import { tagService } from '../services/tagService';
import { TagInput } from '../types'; // Assuming TagInput is here

// Define a custom request type that includes the user property
interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Assuming user object with id is attached by auth middleware
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: 標籤ID (自動產生)
 *         name:
 *           type: string
 *           description: 標籤名稱 (全域唯一)
 *         description:
 *           type: string
 *           nullable: true
 *           description: 標籤描述
 *         userId:
 *           type: string
 *           description: 使用者ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 建立時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 最後更新時間
 *       example:
 *         id: "clxkr1c1o0000v7qy8s7b2r7n"
 *         name: "AI"
 *         description: "AI 相關資訊"
 *         userId: "clxkr1c1o0000v7qy8s7b2r7n"
 *         createdAt: "2025-06-02T10:00:00.000Z"
 *         updatedAt: "2025-06-02T11:00:00.000Z"
 *   requestBodies:
 *     TagBody:
 *       description: 建立或更新標籤的請求內容
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: 標籤名稱
 *                 example: "工作"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: 標籤描述
 *                 example: "與工作相關的項目"
 *               userId:
 *                 type: string
 *                 description: 使用者ID (由系統自動填充)
 *                 example: "clxkr1c1o0000v7qy8s7b2r7n"
 */

// 定義控制器方法的介面以提高清晰度
interface ITagController {
  getAllTags: RequestHandler;
  getTagById: RequestHandler;
  createTag: RequestHandler;
  updateTag: RequestHandler;
  deleteTag: RequestHandler;
}

export const tagController: ITagController = {
  // 獲取所有標籤
  getAllTags: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      const tags = await tagService.getAllTags(userId);
      res.json(tags);
    } catch (error) {
      next(error);
    }
  },

  // 根據 ID 獲取標籤
  getTagById: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      const { id } = req.params;
      const tag = await tagService.getTagById(id, userId);
      
      if (!tag) {
        res.status(404).json({ error: 'Tag not found or not owned by user' });
        return;
      }
      
      res.json(tag);
    } catch (error) {
      next(error);
    }
  },

  // 創建新標籤
  createTag: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      const { name, description } = req.body;
      
      if (!name) {
        res.status(400).json({ error: 'Tag name is required' });
        return;
      }
      
      // Check if tag with this name already exists globally (as per schema `name @unique`)
      const globallyExistingTag = await tagService.checkTagExistsByNameGlobal(name);
      if (globallyExistingTag) {
        res.status(409).json({ error: 'Tag with this name already exists globally' });
        return;
      }
      
      const tagData: TagInput = { name, description, userId };
      const newTag = await tagService.createTag(tagData);
      res.status(201).json(newTag);
    } catch (error) {
      next(error);
    }
  },

  // 更新標籤
  updateTag: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      const { id } = req.params;
      const { name, description } = req.body;

      const updateData: Partial<Omit<TagInput, 'userId'>> = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;

      if (Object.keys(updateData).length === 0) {
        res.status(400).json({ error: 'No update data provided' });
        return;
      }
      
      const updatedTag = await tagService.updateTag(id, updateData, userId);
      if (!updatedTag) {
          res.status(404).json({ error: 'Tag not found, not owned by user, or update failed due to name conflict' });
          return;
      }
      res.json(updatedTag);
    } catch (error) {
      if (error instanceof Error && error.message === 'Tag name already exists globally') {
        res.status(409).json({ error: error.message });
        return;
      }
      next(error);
    }
  },

  // 刪除標籤
  deleteTag: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: 'User not authenticated' });
        return;
      }
      const { id } = req.params;
      const result = await tagService.deleteTag(id, userId);
      if (result === null) { 
        res.status(404).json({ error: 'Tag not found or not owned by user' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};