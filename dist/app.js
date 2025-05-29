"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const informationItemRoutes_1 = __importDefault(require("./routes/informationItemRoutes"));
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
const itemTagAssociationRoutes_1 = __importDefault(require("./routes/itemTagAssociationRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 其他 API 路由
app.use('/api/items', informationItemRoutes_1.default);
app.use('/api/tags', tagRoutes_1.default);
app.use('/api/associations', itemTagAssociationRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
