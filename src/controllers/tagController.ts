import { Request, Response, NextFunction, RequestHandler } from 'express';
import { tagService } from '../services/tagService';

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
  getAllTags: async (req, res, next) => {
    try {
      const tags = await tagService.getAllTags();
      res.json(tags);
    } catch (error) {
      // 將錯誤傳遞給集中的錯誤處理常式
      next(error);
    }
  },

  // 根據 ID 獲取標籤
  getTagById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const tag = await tagService.getTagById(id);
      
      if (!tag) {
        // 如果找不到資源，通常會回傳 404
        res.status(404).json({ error: 'Tag not found' });
        return;
      }
      
      res.json(tag);
    } catch (error) {
      next(error);
    }
  },

  // 創建新標籤
  createTag: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      
      if (!name) {
        res.status(400).json({ error: 'Tag name is required' });
        return;
      }
      
      const existingTag = await tagService.getTagByName(name);
      if (existingTag) {
        res.status(409).json({ error: 'Tag with this name already exists' });
        return;
      }
      
      const newTag = await tagService.createTag({ name, description });
      res.status(201).json(newTag);
    } catch (error) {
      next(error);
    }
  },

  // 更新標籤
  updateTag: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      
      if (name) {
        const existingTag = await tagService.getTagByName(name);
        // 確保 existingTag 上的 'id' 是可比較的（例如，如果一個是數字而另一個是字串）
        // 假設 existingTag.id 和來自 req.params 的 id 應謹慎比較。
        // 如果 existingTag.id 是來自資料庫的數字且 req.params.id 是字串：
        if (existingTag && String(existingTag.id) !== id) {
          res.status(409).json({ error: 'Tag with this name already exists' });
          return;
        }
      }
      
      const updatedTag = await tagService.updateTag(id, { name, description });
      // 檢查標籤是否確實被找到並更新
      if (!updatedTag) {
          res.status(404).json({ error: 'Tag not found for update' });
          return;
      }
      res.json(updatedTag);
    } catch (error) {
      next(error);
    }
  },

  // 刪除標籤
  deleteTag: async (req, res, next) => {
    try {
      const { id } = req.params;
      // 考慮 deleteTag 回傳什麼，或在找不到時是否會拋出錯誤
      await tagService.deleteTag(id); 
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};