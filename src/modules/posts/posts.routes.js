import { Router } from 'express';
import * as postsController from './posts.controller.js';

const router = Router();

router.post('/', postsController.createPost);
router.get('/', postsController.getPosts);

export default router;
