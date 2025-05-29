"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import informationItemRoutes from './routes/informationItemRoutes';
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
// import itemTagAssociationRoutes from './routes/itemTagAssociationRoutes';
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// 中間件
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 路由
// app.use('/api/items', informationItemRoutes);
app.use('/api/tags', tagRoutes_1.default);
// app.use('/api/associations', itemTagAssociationRoutes);
// 錯誤處理
app.use(errorHandler_1.errorHandler);
exports.default = app;
