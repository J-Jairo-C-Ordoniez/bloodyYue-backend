import postsRepository from './posts.repository.js';
import validators from '../../utils/validators/index.js';
import notificationsService from '../notifications/notifications.service.js';


const postsService = {
    createPost: async (userId, data) => {
        const { post, labels } = data;

        if (
            (!post.title || !validators.isString(post.title)) ||
            (!post.description || !validators.isString(post.description)) ||
            (!post.content || !validators.isLink(post.content)) ||
            (!post.typePost || !validators.isString(post.typePost))||
            (!userId)
        ) {
            throw ({ message: "Invalid Inputs", statusCode: 400 });
        }

        const newPost = await postsRepository.createPost({
            userId,
            title: post.title,
            description: post.description,
            content: post.content,
            typePost: post.typePost
        });

        if (!newPost) {
            throw ({ message: "Post creation failed", statusCode: 500 });
        }

        if (labels && labels.length > 0) {
            await postsRepository.addLabels(newPost.postId, labels);
        }

        notificationsService.createNotification({
            userId,
            type: 'post',
            message: `El usuario ${userId} ha creado un nuevo post`,
            content: post.content,
        });

        return { ...newPost, labels };
    },

    getPosts: async (id) => {
        const posts = await postsRepository.getPosts(id);

        if (!posts) {
            throw ({ message: "Posts not found", statusCode: 404 });
        }

        return posts;
    },

    getPost: async (id) => {
        const post = await postsRepository.getPostById(id);

        if (!post) {
            throw ({ message: "Post not found", statusCode: 404 });
        }

        const labels = await postsRepository.getLabelsByPostId(id);
        return { ...post, labels };
    },

    getPostsByLabel: async (labelId) => {
        if (!labelId) {
            throw ({ message: "Invalid label", statusCode: 400 });
        }
        const posts = await postsRepository.getPostsByLabel(labelId);

        if (!posts) {
            throw ({ message: "Posts not found", statusCode: 404 });
        }

        return posts;
    },

    getPostsByTitle: async (title) => {
        if (!title) {
            throw ({ message: "No title provided", statusCode: 400 });
        }

        const posts = await postsRepository.getPostsByTitle(title);

        if (!posts) {
            throw ({ message: "Posts not found", statusCode: 404 });
        }

        return posts;
    },

    updatePost: async (id, data) => {
        if (!id) {
            throw ({ message: "No id provided", statusCode: 400 });
        }
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw ({ message: "Post not found", statusCode: 404 });
        }

        const errors = validators.validateUpdate(data);
        if (errors.length > 0) {
            throw ({ message: errors, statusCode: 400 });
        }

        const updated = await postsRepository.updatePost(id, data);
        if (!updated) {
            throw ({ message: "Post update failed", statusCode: 500 });
        }

        return postsService.getPost(id);
    },

    updatePostLabels: async (id, labels) => {
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw ({ message: "Post not found", statusCode: 404 });
        }

        if (!labels || !labels.length > 0) {
            throw ({ message: "Invalid labels", statusCode: 400 });
        }

        const removed = await postsRepository.removeLabels(id);

        if (!removed) {
            throw ({ message: "Labels not removed", statusCode: 500 });
        }

        const added = await postsRepository.addLabels(id, labels);

        if (!added) {
            throw ({ message: "Labels not added", statusCode: 500 });
        }

        const newLabels = await postsRepository.getLabelsByPostId(id);

        return { message: "Labels updated successfully", labels: newLabels };
    },

    deletePost: async (id) => {
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw ({ message: "Post not found", statusCode: 404 });
        }
+
        await postsRepository.removeAllReactionsByPostId(id);
        await postsRepository.removeLabels(id);

        const deleted = await postsRepository.deletePost(id);
        if (!deleted) {
            throw ({ message: "Post deletion failed", statusCode: 500 });
        }

        return { message: "Post deleted successfully", post: deleted };
    },

    getPostReactions: async (id) => {
        const post = await postsRepository.getPostById(id);
        if (!post) {
            throw ({ message: "Post not found", statusCode: 404 });
        }
        const reactions = await postsRepository.getPostReactions(id);
        if (!reactions) {
            throw ({ message: "Reactions not found", statusCode: 404 });
        }
        return reactions;
    },

    createPostReaction: async (data) => {
        const { postId, userId } = data;
        if (!postId || !userId) {
            throw ({ message: "Invalid data", statusCode: 400 });
        }

        const post = await postsRepository.getPostById(postId);
        if (!post) {
            throw ({ message: "Post not found", statusCode: 404 });
        }

        const reaction = await postsRepository.getPostReactions(postId);
        if (reaction) {
            throw ({ message: "Reaction already exists", statusCode: 400 });
        }

        const reactionId = await postsRepository.addReaction({ postId, userId });
        if (!reactionId) {
            throw ({ message: "Reaction failed", statusCode: 500 });
        }

        return postsService.getPostReactions(postId);
    },

    deletePostReaction: async (data) => {
        const { postId, userId } = data;
        if (!postId || !userId) {
            throw ({ message: "Invalid data", statusCode: 400 });
        }

        const deleted = await postsRepository.removeReaction({ postId, userId });
        console.log(deleted);
        if (!deleted) {
            throw ({ message: "Reaction not found", statusCode: 404 });
        }

        return postsService.getPostReactions(postId);
    }
};

export default postsService;