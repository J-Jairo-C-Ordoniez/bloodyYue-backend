import postsRepository from './posts.repository.js';
import validators from '../../utils/validators/index.js';
import notificationsService from '../notifications/notifications.service.js';
import userRepository from '../../modules/users/user.repository.js';
import AppError from '../../utils/errors/AppError.js';

const postsService = {
    createPost: async (userId, data) => {
        const { post, labels } = data;

        if (
            (!post.title || !validators.isString(post.title)) ||
            (!post.description || !validators.isString(post.description)) ||
            (!post.content || !validators.isLink(post.content)) ||
            (!post.typePost || !validators.isString(post.typePost)) ||
            (!userId)
        ) {
            throw new AppError("Invalid Inputs", 400);
        }

        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const newPost = await postsRepository.createPost({
            userId,
            title: post.title,
            description: post.description,
            content: post.content,
            typePost: post.typePost
        });

        if (!newPost) {
            throw new AppError("Post creation failed", 500);
        }

        if (labels && labels.length > 0) {
            await postsRepository.addLabels(newPost.postId, labels);
        }

        await notificationsService.createNotificationGlobal({
            userId,
            type: 'post',
            message: `${user.name} ha creado un nuevo post`
        });

        return { ...newPost, labels };
    },

    getPosts: async (id) => {
        const posts = await postsRepository.getPosts(id);

        if (!posts) {
            throw new AppError("Posts not found", 404);
        }

        return posts;
    },

    getPostRandom: async () => {
        const post = await postsRepository.getPostRandom();

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const labels = await postsRepository.getLabelsByPostId(post.postId);
        return { ...post, labels };
    },

    getPost: async (id) => {
        const post = await postsRepository.getPostById(id);

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const labels = await postsRepository.getLabelsByPostId(id);
        return { ...post, labels };
    },

    getPostsByLabel: async (labelId) => {
        if (!labelId) {
            throw new AppError("Invalid label", 400);
        }
        const posts = await postsRepository.getPostsByLabel(labelId);

        if (!posts) {
            throw new AppError("Posts not found", 404);
        }

        return posts;
    },

    getPostsByTitle: async (title) => {
        if (!title) {
            throw new AppError("No title provided", 400);
        }

        const posts = await postsRepository.getPostsByTitle(title);

        if (!posts) {
            throw new AppError("Posts not found", 404);
        }

        return posts;
    },

    updatePost: async (id, data) => {
        if (!id) {
            throw new AppError("No id provided", 400);
        }
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const errors = validators.validateUpdate(data);
        if (errors.length > 0) {
            throw new AppError(errors, 400);
        }

        const updated = await postsRepository.updatePost(id, data);
        if (!updated) {
            throw new AppError("Post update failed", 500);
        }

        return postsService.getPost(id);
    },

    updatePostLabels: async (id, labels) => {
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw new AppError("Post not found", 404);
        }

        if (!labels || !labels.length > 0) {
            throw new AppError("Invalid labels", 400);
        }

        const removed = await postsRepository.removeLabels(id);

        if (!removed) {
            throw new AppError("Labels not removed", 500);
        }

        const added = await postsRepository.addLabels(id, labels);

        if (!added) {
            throw new AppError("Labels not added", 500);
        }

        const newLabels = await postsRepository.getLabelsByPostId(id);

        return { message: "Labels updated successfully", labels: newLabels };
    },

    deletePost: async (id) => {
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw new AppError("Post not found", 404);
        }

        await postsRepository.removeAllReactionsByPostId(id);
        await postsRepository.removeLabels(id);

        const deleted = await postsRepository.deletePost(id);
        if (!deleted) {
            throw new AppError("Post deletion failed", 500);
        }

        return { message: "Post deleted successfully", post: deleted };
    },

    getPostReactions: async (id) => {
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw new AppError("Post not found", 404);
        }
        const reactions = await postsRepository.getPostReactions(id);
        return reactions;
    },

    createPostReaction: async (data) => {
        const { postId, userId } = data;
        if (!postId || !userId) {
            throw new AppError("Invalid data", 400);
        }

        const user = await userRepository.getUserById(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const post = await postsRepository.getPostById(postId);
        if (!post) {
            throw new AppError("Post not found", 404);
        }

        const reaction = await postsRepository.getPostReactions(postId);
        if (reaction && reaction.some(r => r.userId === userId)) {
            throw new AppError("Reaction already exists", 400);
        }

        const reactionId = await postsRepository.addReaction({ postId, userId });
        if (!reactionId) {
            throw new AppError("Reaction failed", 500);
        }

        await notificationsService.createNotificationPostReaction({
            userIdNotify: post.userId,
            userId,
            type: 'reaction',
            message: `${user.name} ha reaccionado a tu post`
        });

        return { message: "Reaction added successfully", reactionId };
    },

    deletePostReaction: async (data) => {
        const { postId, userId } = data;
        if (!postId || !userId) {
            throw new AppError("Invalid data", 400);
        }

        const deleted = await postsRepository.removeReaction({ postId, userId });
        if (!deleted) {
            throw new AppError("Reaction not found", 404);
        }

        return { message: "Reaction removed successfully", reactionId: deleted };
    }
};

export default postsService;