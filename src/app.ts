import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import informationItemRoutes from './routes/informationItemRoutes';
import tagRoutes from './routes/tagRoutes';
import itemTagAssociationRoutes from './routes/itemTagAssociationRoutes';
import userRoutes from './routes/userRoutes'; // Added import for user routes
import { errorHandler } from './middleware/errorHandler';
import swaggerSpec from './swaggerConfig';

const app = express();

app.use(cors());
app.use(express.json());

// 其他 API 路由
app.use('/api/items', informationItemRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/item-tag-associations', itemTagAssociationRoutes);
app.use('/api/users', userRoutes); // Added user routes

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;