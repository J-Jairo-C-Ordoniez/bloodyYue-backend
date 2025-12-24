import { Router } from 'express';
import postsController from './posts.controller.js';

const router = Router();

router.post(
    '/posts',
    postsController.createPost
);

router.get(
    '/posts/list/:id',
    postsController.getPosts
);

router.get(
    '/posts/:id',
    postsController.getPost
);

router.get(
    '/posts/filter/:labelId',
    postsController.getPostsByLabel
);

router.get(
    '/posts/filter/:title',
    postsController.getPostsByTitle
);

router.put(
    '/posts/:id',
    postsController.updatePost
);

router.put(
    '/posts/:id/labels',
    postsController.updatePostLabels
);

router.delete(
    '/posts/:id',
    postsController.deletePost
);

router.get(
    '/posts/:id/reactions',
    postsController.getPostReactions
);

router.post(
    '/:id/reactions',
    postsController.createPostReaction
);

router.delete(
    '/posts/:id/reactions',
    postsController.deletePostReaction
);

export default router;

/* 
{
    "post": {
        "title": "Bienbenido a BloodyYue",
        "description": "Primer post de BloodyYue",
        "content": "https://www.bloodyyue.com",
        "typePostId": "image",
        "userId": 1
    },
    "labels": [
        {
            "labelId": 1
        },
        {
            "labelId": 4
        }
    ]
}
*/