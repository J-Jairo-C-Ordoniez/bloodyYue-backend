import * as settingsRepository from './settings.repository.js';

export const getSettings = async () => {
    return settingsRepository.getSettings();
};

export const updateSettings = async (data) => {
    return settingsRepository.updateSettings(data);
};
