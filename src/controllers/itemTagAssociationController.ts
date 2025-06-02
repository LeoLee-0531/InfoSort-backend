import { Request, Response, NextFunction, RequestHandler } from 'express';
import { itemTagAssociationService } from '../services/itemTagAssociationService';

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemTagAssociation:
 *       type: object
 *       required:
 *         - itemId
 *         - tagId
 *       properties:
 *         itemId:
 *           type: string
 *           description: 資訊項目的ID
 *         tagId:
 *           type: string
 *           description: 標籤的ID
 *         assignedAt:
 *           type: string
 *           format: date-time
 *           description: 指派時間
 *         assignedBy:
 *           type: string
 *           description: 指派者的使用者ID (在此範例中，我們假設是 item 的 userId)
 *       example:
 *         itemId: "clxko2b0o0000v7qy8s7b2r7n"
 *         tagId: "clxkr1c1o0000v7qy8s7b2r7n"
 *         assignedAt: "2025-06-02T12:00:00.000Z"
 *         assignedBy: "U1234567890abcdef1234567890abcdef"
 *   requestBodies:
 *     ItemTagAssociationBody:
 *       description: 建立資訊項目與標籤關聯的請求內容
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - tagId
 *             properties:
 *               itemId:
 *                 type: string
 *                 description: 資訊項目的ID
 *                 example: "clxko2b0o0000v7qy8s7b2r7n"
 *               tagId:
 *                 type: string
 *                 description: 標籤的ID
 *                 example: "clxkr1c1o0000v7qy8s7b2r7n"
 */

// 定義控制器方法的介面
interface IItemTagAssociationController {
  addTagToItem: RequestHandler;
  removeTagFromItem: RequestHandler;
  getTagsForItem: RequestHandler;
  getItemsWithTag: RequestHandler;
}

export const itemTagAssociationController: IItemTagAssociationController = {
  // 為資訊項目添加標籤
  addTagToItem: async (req, res, next) => {
    try {
      const { itemId, tagId } = req.body;
      
      if (!itemId || !tagId) {
        res.status(400).json({ error: 'Item ID and Tag ID are required' });
        return;
      }
      
      const association = await itemTagAssociationService.addTagToItem({
        itemId,
        tagId
      });
      
      res.status(201).json(association);
    } catch (error: any) {
      // 處理唯一約束衝突
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'This tag is already associated with this item' });
        return;
      }
      next(error);
    }
  },

  // 從資訊項目中移除標籤
  removeTagFromItem: async (req, res, next) => {
    try {
      const { itemId, tagId } = req.params;
      await itemTagAssociationService.removeTagFromItem(itemId, tagId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  // 獲取資訊項目的所有標籤
  getTagsForItem: async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const tags = await itemTagAssociationService.getTagsForItem(itemId);
      res.json(tags);
    } catch (error) {
      next(error);
    }
  },

  // 獲取帶有特定標籤的所有資訊項目
  getItemsWithTag: async (req, res, next) => {
    try {
      const { tagId } = req.params;
      const items = await itemTagAssociationService.getItemsWithTag(tagId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }
};