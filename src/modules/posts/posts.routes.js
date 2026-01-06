import { Router } from 'express';
import postsController from './posts.controller.js';
import authenticate from '../../middlewares/auth/authenticate.middleware.js';
import authorizePermission from '../../middlewares/auth/authorize.middleware.js';

const router = Router();

router.post(
    '/',
    authenticate,
    authorizePermission('createPost'),
    postsController.createPost
);

router.get(
    '/list/:id',
    postsController.getPosts
);

router.get(
    '/:id',
    authenticate,
    postsController.getPost
);

router.get(
    '/filter/label/:labelId',
    authenticate,
    postsController.getPostsByLabel
);

router.get(
    '/filter/title/:title',
    authenticate,
    postsController.getPostsByTitle
);

router.put(
    '/:id',
    authenticate,
    authorizePermission('updatePost'),
    postsController.updatePost
);

router.put(
    '/:id/labels',
    authenticate,
    authorizePermission('updatePost'),
    postsController.updatePostLabels
);

router.delete(
    '/:id',
    authenticate,
    authorizePermission('deletePost'),
    postsController.deletePost
);

router.get(
    '/:id/reactions',
    authenticate,
    postsController.getPostReactions
);

router.post(
    '/:id/reactions',
    authenticate,
    postsController.createPostReaction
);

router.delete(
    '/:id/reactions',
    authenticate,
    postsController.deletePostReaction
);

export default router;