import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import informationItemRoutes from './routes/informationItemRoutes';
import tagRoutes from './routes/tagRoutes';
import itemTagAssociationRoutes from './routes/itemTagAssociationRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import swaggerSpec from './swaggerConfig';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI 設定 - 公開，因此在此之前不需要認證
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 公開路由（不需要認證）
app.use('/api/auth', authRoutes); // 身份驗證路由（登入）
app.use('/api/users', userRoutes); // 用於建立使用者的公開路由

// 將認證中介軟體應用於所有後續的 API 路由
app.use('/api', authMiddleware);

// 需要認證的 API 路由
app.use('/api/items', informationItemRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/item-tag-associations', itemTagAssociationRoutes);

app.use(errorHandler as ErrorRequestHandler);

export default app;