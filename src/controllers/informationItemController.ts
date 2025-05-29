import { Request, Response, NextFunction, RequestHandler } from 'express';
import { informationItemService } from '../services/informationItemService';

// 定義控制器方法的介面
interface IInformationItemController {
  getAllItems: RequestHandler;
  getItemById: RequestHandler;
  createItem: RequestHandler;
  updateItem: RequestHandler;
  deleteItem: RequestHandler;
  getItemsByType: RequestHandler;
}

export const informationItemController: IInformationItemController = {
  // 獲取所有資訊項目
  getAllItems: async (req, res, next) => {
    try {
      const userId = req.query.userId as string | undefined;
      const items = await informationItemService.getAllItems(userId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  },

  // 根據 ID 獲取資訊項目
  getItemById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await informationItemService.getItemById(id);
      
      if (!item) {
        res.status(404).json({ error: 'Information item not found' });
        return;
      }
      
      res.json(item);
    } catch (error) {
      next(error);
    }
  },

  // 創建新的資訊項目
  createItem: async (req, res, next) => {
    try {
      const { userId, type, originalContent, title } = req.body;
      
      if (!userId || !type || !originalContent) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      
      const newItem = await informationItemService.createItem({
        userId,
        type,
        originalContent,
        title
      });
      
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },

  // 更新資訊項目
  updateItem: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, originalContent, type } = req.body;
      
      const updatedItem = await informationItemService.updateItem(id, {
        title,
        originalContent,
        type
      });
      
      if (!updatedItem) {
        res.status(404).json({ error: 'Information item not found for update' });
        return;
      }
      
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  },

  // 刪除資訊項目
  deleteItem: async (req, res, next) => {
    try {
      const { id } = req.params;
      await informationItemService.deleteItem(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  // 根據類型獲取資訊項目
  getItemsByType: async (req, res, next) => {
    try {
      const { type } = req.params;
      const userId = req.query.userId as string | undefined;
      const items = await informationItemService.getItemsByType(type, userId);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }
};