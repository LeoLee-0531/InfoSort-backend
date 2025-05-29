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
exports.itemTagAssociationController = void 0;
const itemTagAssociationService_1 = require("../services/itemTagAssociationService");
exports.itemTagAssociationController = {
    // 為資訊項目添加標籤
    addTagToItem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { itemId, tagId } = req.body;
            if (!itemId || !tagId) {
                res.status(400).json({ error: 'Item ID and Tag ID are required' });
                return;
            }
            const association = yield itemTagAssociationService_1.itemTagAssociationService.addTagToItem({
                itemId,
                tagId
            });
            res.status(201).json(association);
        }
        catch (error) {
            // 處理唯一約束衝突
            if (error.code === 'P2002') {
                res.status(409).json({ error: 'This tag is already associated with this item' });
                return;
            }
            next(error);
        }
    }),
    // 從資訊項目中移除標籤
    removeTagFromItem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { itemId, tagId } = req.params;
            yield itemTagAssociationService_1.itemTagAssociationService.removeTagFromItem(itemId, tagId);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }),
    // 獲取資訊項目的所有標籤
    getTagsForItem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { itemId } = req.params;
            const tags = yield itemTagAssociationService_1.itemTagAssociationService.getTagsForItem(itemId);
            res.json(tags);
        }
        catch (error) {
            next(error);
        }
    }),
    // 獲取帶有特定標籤的所有資訊項目
    getItemsWithTag: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { tagId } = req.params;
            const items = yield itemTagAssociationService_1.itemTagAssociationService.getItemsWithTag(tagId);
            res.json(items);
        }
        catch (error) {
            next(error);
        }
    })
};
