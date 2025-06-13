"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const informationItemRoutes_1 = __importDefault(require("./routes/informationItemRoutes"));
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
const itemTagAssociationRoutes_1 = __importDefault(require("./routes/itemTagAssociationRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger UI 設定 - 公開，因此在此之前不需要認證
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
// 公開路由（不需要認證）
app.use('/api/auth', authRoutes_1.default); // 身份驗證路由（登入）
app.use('/api/users', userRoutes_1.default); // 用於建立使用者的公開路由
// 將認證中介軟體應用於所有後續的 API 路由
app.use('/api', authMiddleware_1.authMiddleware);
// 需要認證的 API 路由
app.use('/api/items', informationItemRoutes_1.default);
app.use('/api/tags', tagRoutes_1.default);
app.use('/api/item-tag-associations', itemTagAssociationRoutes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
