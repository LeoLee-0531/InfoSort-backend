import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

import informationItemRoutes from './routes/informationItemRoutes';
import tagRoutes from './routes/tagRoutes';
import itemTagAssociationRoutes from './routes/itemTagAssociationRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /items:
 *   get:
 *     summary: 取得所有資訊項目
 *     responses:
 *       200:
 *         description: 成功取得資訊項目列表
 */

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 其他 API 路由
app.use('/api/items', informationItemRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/associations', itemTagAssociationRoutes);

app.use(errorHandler);

export default app;