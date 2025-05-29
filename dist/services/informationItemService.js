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
exports.informationItemService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
exports.informationItemService = {
    // 獲取所有資訊項目
    getAllItems: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const filter = userId ? { userId } : {};
        return client_1.default.informationItem.findMany({
            where: filter,
            include: {
                tagAssociations: {
                    include: {
                        tag: true
                    }
                }
            }
        });
    }),
    // 根據 ID 獲取資訊項目
    getItemById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.informationItem.findUnique({
            where: { id },
            include: {
                tagAssociations: {
                    include: {
                        tag: true
                    }
                }
            }
        });
    }),
    // 創建新的資訊項目
    createItem: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.informationItem.create({
            data
        });
    }),
    // 更新資訊項目
    updateItem: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.informationItem.update({
            where: { id },
            data
        });
    }),
    // 刪除資訊項目
    deleteItem: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.informationItem.delete({
            where: { id }
        });
    }),
    // 根據類型獲取資訊項目
    getItemsByType: (type, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const filter = userId ? { type, userId } : { type };
        return client_1.default.informationItem.findMany({
            where: filter,
            include: {
                tagAssociations: {
                    include: {
                        tag: true
                    }
                }
            }
        });
    })
};
