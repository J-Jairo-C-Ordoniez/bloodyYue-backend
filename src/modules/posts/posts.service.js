import * as postsRepository from './posts.repository.js';

export const createPost = async (data) => {
    return postsRepository.create(data);
};

export const getPosts = async () => {
    return postsRepository.getAll();
};
