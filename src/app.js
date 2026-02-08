import express from 'express';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import config from './config/env.config.js';
import socketConfig from './config/socket.config.js';
import notFound from './middlewares/errors/notFound.middleware.js';
import globalErrorHandler from './middlewares/errors/error.middleware.js';

import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import settingsRoutes from './modules/settings/settings.routes.js';
import commissionsRoutes from './modules/commissions/commissions.routes.js';
import cartRoutes from './modules/cart/cart.routes.js';
import salesRoutes from './modules/sales/sales.routes.js';
import postsRoutes from './modules/posts/posts.routes.js';
import mediaRoutes from './modules/media/media.routes.js';
import chatRoutes from './modules/chat/chat.routes.js';
import labelsRoutes from './modules/labels/labels.routes.js';
import rolesRoutes from './modules/roles/roles.routes.js';
import notificationsRoutes from './modules/notifications/notifications.routes.js';

const app = express();

// Security and Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/commissions', commissionsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/labels', labelsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/notifications', notificationsRoutes);

app.get('/', (req, res) => {
  res.send('BloodyYue Backend API is running');
});

app.use(notFound);
app.use(globalErrorHandler);

let server;
if (config.env === 'development') {
  server = https.createServer(
    {
      key: fs.readFileSync('./certs/localhost+2-key.pem'),
      cert: fs.readFileSync('./certs/localhost+2.pem')
    },
    app
  );
} else {
  server = app;
}

const io = socketConfig(server);

const serverInstance = server.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
});
