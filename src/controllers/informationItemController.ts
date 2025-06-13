import { Request, Response, NextFunction, RequestHandler } from 'express';
import { informationItemService } from '../services/informationItemService';

/**
 * @swagger
 * components:
 *   schemas:
 *     InformationItem:
 *       type: object
 *       required:
 *         - userId
 *         - type
 *         - originalContent
 *       properties:
 *         id:
 *           type: string
 *           description: 資訊項目ID (自動產生)
 *         userId:
 *           type: string
 *           description: 所屬使用者的ID
 *         type:
 *           type: string
 *           description: 資訊類型 (例如：連結、圖片、檔案)
 *         title:
 *           type: string
 *           nullable: true
 *           description: 資訊標題
 *         originalContent:
 *           type: string
 *           description: 原始內容
 *         summary:
 *           type: string
 *           nullable: true
 *           description: AI 生成的摘要
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 建立時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 最後更新時間
 *         tagAssociations:
 *           type: array
 *           description: 相關聯的標籤
 *           items:
 *             $ref: '#/components/schemas/InformationItemTagAssociation'
 *       example:
 *         id: "clxko2b0o0000v7qy8s7b2r7n"
 *         userId: "U1234567890abcdef1234567890abcdef"
 *         type: "筆記"
 *         title: "關於專案A的會議記錄"
 *         originalContent: "今天討論了專案A的進度，下週三前需要完成第一階段。"
 *         summary: "專案A進度會議，下週三完成第一階段。"
 *         createdAt: "2025-06-02T10:00:00.000Z"
 *         updatedAt: "2025-06-02T11:00:00.000Z"
 *         tagAssociations: 
 *           - id: "683d147585f5dbdfa9a76891"
 *             itemId: "clxko2b0o0000v7qy8s7b2r7n"
 *             tagId: "683815b63f12650c7d1fe01d"
 *             tag:
 *               id: "683815b63f12650c7d1fe01d"
 *               name: "AI"
 *               description: "AI 相關的資料"
 *               createdAt: "2025-05-29T08:07:18.555Z"
 *               updatedAt: "2025-05-29T08:07:18.555Z"
 *     InformationItemTagAssociation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 關聯ID
 *         itemId:
 *           type: string
 *           description: 資訊項目ID
 *         tagId:
 *           type: string
 *           description: 標籤ID
 *         tag:
 *           $ref: '#/components/schemas/TagInAssociation'
 *       example:
 *         id: "683d147585f5dbdfa9a76891"
 *         itemId: "683d126185f5dbdfa9a76890"
 *         tagId: "683815b63f12650c7d1fe01d"
 *         tag:
 *           id: "683815b63f12650c7d1fe01d"
 *           name: "AI"
 *           description: "AI 相關的資料"
 *           createdAt: "2025-05-29T08:07:18.555Z"
 *           updatedAt: "2025-05-29T08:07:18.555Z"
 *     TagInAssociation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 標籤ID
 *         name:
 *           type: string
 *           description: 標籤名稱
 *         description:
 *           type: string
 *           nullable: true
 *           description: 標籤描述
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: 建立時間
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: 最後更新時間
 *       example:
 *         id: "683815b63f12650c7d1fe01d"
 *         name: "AI"
 *         description: "AI 相關的資料"
 *         createdAt: "2025-05-29T08:07:18.555Z"
 *         updatedAt: "2025-05-29T08:07:18.555Z"
 *   requestBodies:
 *     InformationItemBody:
 *       description: 建立或更新資訊項目的請求內容
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - originalContent
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 所屬使用者的ID
 *                 example: "U1234567890abcdef1234567890abcdef"
 *               type:
 *                 type: string
 *                 description: 資訊類型
 *                 example: "任務"
 *               title:
 *                 type: string
 *                 nullable: true
 *                 description: 資訊標題
 *                 example: "完成API文件撰寫"
 *               originalContent:
 *                 type: string
 *                 description: 原始內容
 *                 example: "需要為 /users 和 /items 兩個端點撰寫 Swagger 文件。"
 *     UpdateInformationItemBody:
 *       description: 更新資訊項目的請求內容
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: 資訊類型
 *                 example: "任務"
 *               title:
 *                 type: string
 *                 nullable: true
 *                 description: 資訊標題
 *                 example: "完成API文件撰寫 (已更新)"
 *               originalContent:
 *                 type: string
 *                 description: 原始內容
 *                 example: "需要為 /users, /items 和 /tags 三個端點撰寫 Swagger 文件。"
 */

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
      const userId = req.query.userId as string; // 修改為 string
      if (!userId) { // 新增檢查
        res.status(400).json({ error: 'User ID is required' });
        return;
      }
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