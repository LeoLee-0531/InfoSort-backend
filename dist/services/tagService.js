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
    // 獲取所有標籤
    getAllTags: () => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.tag.findMany();
    }),
    // 根據 ID 獲取標籤
    getTagById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.tag.findUnique({
            where: { id },
            include: {
                itemAssociations: {
                    include: {
                        item: true
                    }
                }
            }
        });
    }),
    // 根據名稱獲取標籤
    getTagByName: (name) => __awaiter(void 0, void 0, void 0, function* () {
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
    // 更新標籤
    updateTag: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.tag.update({
            where: { id },
            data
        });
    }),
    // 刪除標籤
    deleteTag: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.tag.delete({
            where: { id }
        });
    })
};
