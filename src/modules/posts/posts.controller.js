import postsService from './posts.service.js';
import { success, error } from '../../utils/response/response.js';

const postsController = {
    createPost: async (req, res) => {
        try {
            const { userId } = req.user;
            const post = await postsService.createPost(userId, req.body);
            success(req, res, post, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getPosts: async (req, res) => {
        try {
            const { id } = req.params;
            const posts = await postsService.getPosts(id);
            success(req, res, posts, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getPostRandom: async (req, res) => {
        try {
            const post = await postsService.getPostRandom();
            success(req, res, post, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getPost: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await postsService.getPost(id);
            success(req, res, post, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getPostsByLabel: async (req, res) => {
        try {
            const { labelId } = req.params;
            const posts = await postsService.getPostsByLabel(labelId);
            success(req, res, posts, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getPostsByTitle: async (req, res) => {
        try {
            const { title } = req.params;
            const posts = await postsService.getPostsByTitle(title);
            success(req, res, posts, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updatePost: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await postsService.updatePost(id, req.body);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    updatePostLabels: async (req, res) => {
        try {
            const { id } = req.params;
            const { labels } = req.body;
            const result = await postsService.updatePostLabels(id, labels);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await postsService.deletePost(id);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    getPostReactions: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await postsService.getPostReactions(id);
            success(req, res, result, 200);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    createPostReaction: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.user;
            const result = await postsService.createPostReaction({ postId: id, userId });
            success(req, res, result, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    },

    deletePostReaction: async (req, res) => {
        try {
            const { id } = req.params;
            const { userId } = req.user;
            const result = await postsService.deletePostReaction({ postId: id, userId });
            success(req, res, result, 201);
        } catch (err) {
            error(req, res, err.message, err.statusCode);
        }
    }
};

export default postsController;