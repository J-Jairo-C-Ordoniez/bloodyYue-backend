import settingsRepository from './settings.repository.js';
import validator from '../../utils/validators/index.js';
import AppError from '../../utils/errors/AppError.js';

const settingsService = {
    createSettings: async (data) => {
        const { title, subtitle, contentHero, email, abaut, work, redes, usagePolicies, seoMeta } = data;

        if (
            (!title && validator.isString(title)) ||
            (!subtitle && validator.isString(subtitle)) ||
            (!contentHero && validator.isLink(contentHero)) ||
            (!email && validator.isEmail(email)) ||
            (!abaut && validator.isString(abaut)) ||
            (!work && validator.isString(work)) ||
            (!redes && validator.isJson(redes)) ||
            (!usagePolicies && validator.isString(usagePolicies)) ||
            (!seoMeta && validator.isJson(seoMeta))
        ) {
            throw new AppError('Invalid Inputs', 400);
        }

        const existingSettings = await settingsRepository.getSettings();
        if (existingSettings) {
            throw new AppError('Settings already exists', 400);
        }

        const settings = await settingsRepository.createSettings({
            title,
            subtitle,
            contentHero,
            email,
            abaut,
            work,
            redes: JSON.stringify(redes),
            usagePolicies,
            seoMeta: JSON.stringify(seoMeta)
        });

        if (!settings) {
            throw new AppError('Settings not created', 500);
        }

        return settings;
    },

    getSettings: async (id) => {
        if (!id) {
            throw new AppError('Invalid Inputs', 400);
        }
        const settings = await settingsRepository.getSettings(id);
        if (!settings) {
            throw new AppError('Settings not found', 404);
        }

        return {
            settingId: settings.settingId,
            title: settings.title,
            subtitle: settings.subtitle,
            contentHero: settings.contentHero,
            email: settings.email,
            abaut: settings.abaut,
            work: settings.work,
            redes: settings.redes,
            usagePolicies: settings.usagePolicies,
            seoMeta: settings.seoMeta
        };
    },

    updateSettings: async (id, data) => {
        if (!id) {
            throw new AppError('Invalid Inputs', 400);
        }

        const settings = await settingsRepository.getSettings(id);
        if (!settings) {
            throw new AppError('Settings not found', 404);
        }

        const errors = validator.validateUpdate(data);
        if (errors.length > 0) {
            throw new AppError(errors, 400);
        }

        const updatedSettings = await settingsRepository.updateSettings(id, data);
        if (!updatedSettings) {
            throw new AppError('Settings not updated', 500);
        }

        return settingsService.getSettings(id);
    },
};

export default settingsService;