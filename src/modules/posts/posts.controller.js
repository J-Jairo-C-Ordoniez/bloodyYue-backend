import * as postsService from './posts.service.js';
import { success, error } from '../../utils/response/response.js';

export const createPost = async (req, res) => {
    try {
        const post = await postsService.createPost(req.body);
        success(req, res, post, 201);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await postsService.getPosts();
        success(req, res, posts, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
