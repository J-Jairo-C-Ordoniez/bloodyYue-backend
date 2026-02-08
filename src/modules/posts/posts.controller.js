import postsService from './posts.service.js';
import { success } from '../../utils/response/response.js';
import asyncHandler from '../../utilsCode/asyncHandler.js';

const postsController = {
    createPost: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const post = await postsService.createPost(userId, req.body);
        success(req, res, post, 201);
    }),

    getPosts: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const posts = await postsService.getPosts(id);
        success(req, res, posts, 200);
    }),

    getPostRandom: asyncHandler(async (req, res) => {
        const post = await postsService.getPostRandom();
        success(req, res, post, 200);
    }),

    getPost: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const post = await postsService.getPost(id);
        success(req, res, post, 200);
    }),

    getPostsByLabel: asyncHandler(async (req, res) => {
        const { labelId } = req.params;
        const posts = await postsService.getPostsByLabel(labelId);
        success(req, res, posts, 200);
    }),

    getPostsByTitle: asyncHandler(async (req, res) => {
        const { title } = req.params;
        const posts = await postsService.getPostsByTitle(title);
        success(req, res, posts, 200);
    }),

    updatePost: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const result = await postsService.updatePost(id, req.body);
        success(req, res, result, 200);
    }),

    updatePostLabels: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { labels } = req.body;
        const result = await postsService.updatePostLabels(id, labels);
        success(req, res, result, 200);
    }),

    deletePost: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const result = await postsService.deletePost(id);
        success(req, res, result, 200);
    }),

    getPostReactions: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const result = await postsService.getPostReactions(id);
        success(req, res, result, 200);
    }),

    createPostReaction: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { userId } = req.user;
        const result = await postsService.createPostReaction({ postId: id, userId });
        success(req, res, result, 201);
    }),

    deletePostReaction: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { userId } = req.user;
        const result = await postsService.deletePostReaction({ postId: id, userId });
        success(req, res, result, 201);
    }),
};

export default postsController;