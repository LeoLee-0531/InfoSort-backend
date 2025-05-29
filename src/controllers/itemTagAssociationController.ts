import { Request, Response, NextFunction, RequestHandler } from 'express';
import { itemTagAssociationService } from '../services/itemTagAssociationService';

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