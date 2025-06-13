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
exports.tagController = void 0;
const tagService_1 = require("../services/tagService");
exports.tagController = {
    // 獲取所有標籤
    getAllTags: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const tags = yield tagService_1.tagService.getAllTags(userId);
            res.json(tags);
        }
        catch (error) {
            next(error);
        }
    }),
    // 根據 ID 獲取標籤
    getTagById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const { id } = req.params;
            const tag = yield tagService_1.tagService.getTagById(id, userId);
            if (!tag) {
                res.status(404).json({ error: 'Tag not found or not owned by user' });
                return;
            }
            res.json(tag);
        }
        catch (error) {
            next(error);
        }
    }),
    // 創建新標籤
    createTag: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
            const globallyExistingTag = yield tagService_1.tagService.checkTagExistsByNameGlobal(name);
            if (globallyExistingTag) {
                res.status(409).json({ error: 'Tag with this name already exists globally' });
                return;
            }
            const tagData = { name, description, userId };
            const newTag = yield tagService_1.tagService.createTag(tagData);
            res.status(201).json(newTag);
        }
        catch (error) {
            next(error);
        }
    }),
    // 更新標籤
    updateTag: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const { id } = req.params;
            const { name, description } = req.body;
            const updateData = {};
            if (name !== undefined)
                updateData.name = name;
            if (description !== undefined)
                updateData.description = description;
            if (Object.keys(updateData).length === 0) {
                res.status(400).json({ error: 'No update data provided' });
                return;
            }
            const updatedTag = yield tagService_1.tagService.updateTag(id, updateData, userId);
            if (!updatedTag) {
                res.status(404).json({ error: 'Tag not found, not owned by user, or update failed due to name conflict' });
                return;
            }
            res.json(updatedTag);
        }
        catch (error) {
            if (error instanceof Error && error.message === 'Tag name already exists globally') {
                res.status(409).json({ error: error.message });
                return;
            }
            next(error);
        }
    }),
    // 刪除標籤
    deleteTag: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }
            const { id } = req.params;
            const result = yield tagService_1.tagService.deleteTag(id, userId);
            if (result === null) {
                res.status(404).json({ error: 'Tag not found or not owned by user' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    })
};
