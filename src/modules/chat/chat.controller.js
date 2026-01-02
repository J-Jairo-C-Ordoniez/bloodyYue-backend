import * as chatService from './chat.service.js';
import { success, error } from '../../utils/response/response.js';

export const sendMessage = async (req, res) => {
    try {
        const message = await chatService.sendMessage(req.body);
        success(req, res, message, 201);
    } catch (err) {
        error(req, res, err.message, 400);
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await chatService.getMessages(req.params.userId);
        success(req, res, messages, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};

export const markAsRead = async (req, res) => {
    try {
        const result = await chatService.markAsRead(req.params.userId);
        success(req, res, { updated: result }, 200);
    } catch (err) {
        error(req, res, err.message, 500);
    }
};
