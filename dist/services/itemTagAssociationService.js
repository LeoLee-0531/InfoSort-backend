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
exports.itemTagAssociationService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
exports.itemTagAssociationService = {
    // 為資訊項目添加標籤
    addTagToItem: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.itemTagAssociation.create({
            data,
            include: {
                item: true,
                tag: true
            }
        });
    }),
    // 從資訊項目中移除標籤
    removeTagFromItem: (itemId, tagId) => __awaiter(void 0, void 0, void 0, function* () {
        return client_1.default.itemTagAssociation.deleteMany({
            where: {
                itemId,
                tagId
            }
        });
    }),
    // 獲取資訊項目的所有標籤
    getTagsForItem: (itemId) => __awaiter(void 0, void 0, void 0, function* () {
        const associations = yield client_1.default.itemTagAssociation.findMany({
            where: { itemId },
            include: { tag: true }
        });
        return associations.map(assoc => assoc.tag);
    }),
    // 獲取帶有特定標籤的所有資訊項目
    getItemsWithTag: (tagId) => __awaiter(void 0, void 0, void 0, function* () {
        const associations = yield client_1.default.itemTagAssociation.findMany({
            where: { tagId },
            include: { item: true }
        });
        return associations.map(assoc => assoc.item);
    })
};
