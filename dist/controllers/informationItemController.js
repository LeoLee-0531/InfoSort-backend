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
exports.informationItemController = void 0;
const informationItemService_1 = require("../services/informationItemService");
exports.informationItemController = {
    // 獲取所有資訊項目
    getAllItems: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.query.userId;
            const items = yield informationItemService_1.informationItemService.getAllItems(userId);
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    }),
    // 根據 ID 獲取資訊項目
    getItemById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const item = yield informationItemService_1.informationItemService.getItemById(id);
            if (!item) {
                res.status(404).json({ error: 'Information item not found' });
                return;
            }
            res.json(item);
        }
        catch (error) {
            next(error);
        }
    }),
    // 創建新的資訊項目
    createItem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, type, originalContent, title } = req.body;
            if (!userId || !type || !originalContent) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }
            const newItem = yield informationItemService_1.informationItemService.createItem({
                userId,
                type,
                originalContent,
                title
            });
            res.status(201).json(newItem);
        }
        catch (error) {
            next(error);
        }
    }),
    // 更新資訊項目
    updateItem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title, originalContent, type } = req.body;
            const updatedItem = yield informationItemService_1.informationItemService.updateItem(id, {
                title,
                originalContent,
                type
            });
            if (!updatedItem) {
                res.status(404).json({ error: 'Information item not found for update' });
                return;
            }
            res.json(updatedItem);
        }
        catch (error) {
            next(error);
        }
    }),
    // 刪除資訊項目
    deleteItem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield informationItemService_1.informationItemService.deleteItem(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }),
    // 根據類型獲取資訊項目
    getItemsByType: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { type } = req.params;
            const userId = req.query.userId;
            const items = yield informationItemService_1.informationItemService.getItemsByType(type, userId);
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    })
};
