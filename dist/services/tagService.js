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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
exports.tagService = {
    // 獲取所有標籤 (屬於特定使用者)
    getAllTags: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.tag.findMany({
            where: { userId }
        });
    }),
    // 根據 ID 獲取標籤 (屬於特定使用者)
    getTagById: (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const tag = yield client_1.default.tag.findUnique({
            where: { id },
            include: {
                itemAssociations: {
                    include: {
                        item: true
                    }
                }
            }
        });
        if (tag && tag.userId === userId) {
            return tag;
        }
        return null;
    }),
    // 根據名稱獲取標籤 (名稱是全域唯一的，但我們也檢查是否屬於特定使用者)
    getTagByName: (name, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const tag = yield client_1.default.tag.findUnique({
            where: { name }
        });
        // If the desire is to find a tag by name *only if* it belongs to the user:
        if (tag && tag.userId === userId) {
            return tag;
        }
        // If the desire is to know if a name is taken globally, irrespective of user for creation purposes, 
        // the controller might call a simpler version or just use this and check the result.
        // For now, this returns the tag only if it matches the name AND the userId.
        return null;
    }),
    // For checking if a tag name exists globally (used by controller before creation)
    checkTagExistsByNameGlobal: (name) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.tag.findUnique({
            where: { name }
        });
    }),
    // 創建新標籤
    createTag: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.tag.create({
            data
        });
    }),
    // 更新標籤 (確保標籤屬於該使用者)
    updateTag: (id, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const tag = yield client_1.default.tag.findUnique({
            where: { id }
        });
        if (!tag || tag.userId !== userId) {
            return null; // Not found or not authorized
        }
        // If name is being updated, it must not conflict with an existing global name
        // This check should ideally be in the controller or a more specific service method
        if (data.name && data.name !== tag.name) {
            const existingByName = yield client_1.default.tag.findUnique({ where: { name: data.name } });
            if (existingByName && existingByName.id !== id) {
                // This name is taken by another tag globally
                throw new Error('Tag name already exists globally'); // Or return a specific error code/object
            }
        }
        return client_1.default.tag.update({
            where: { id }, // id is unique
            data
        });
    }),
    // 刪除標籤 (確保標籤屬於該使用者)
    deleteTag: (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const tag = yield client_1.default.tag.findUnique({
            where: { id }
        });
        if (!tag || tag.userId !== userId) {
            return null; // Not found or not authorized
        }
        return client_1.default.tag.delete({
            where: { id } // id is unique
        });
    })
};
