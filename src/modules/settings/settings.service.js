import settingsRepository from './settings.repository.js';
import validator from '../../utils/validators/index.js';

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
            throw ({message: 'Invalid Inputs', statusCode: 400});
        }

        const existingSettings = await settingsRepository.getSettings();
        if (existingSettings) {
            throw ({message: 'Settings already exists', statusCode: 400});
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
        
        if(!settings){
            throw ({message: 'Settings not created', statusCode: 500});
        }
        
        return settings;
    },
    
    getSettings: async (id) => {
        if(!id){
            throw ({message: 'Invalid Inputs', statusCode: 400});
        }
        const settings = await settingsRepository.getSettings(id);
        if(!settings){
            throw ({message: 'Settings not found', statusCode: 404});
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
        if(!id) {
            throw ({message: 'Invalid Inputs', statusCode: 400});
        }

        const settings = await settingsRepository.getSettings(id);
        if(!settings){
            throw ({message: 'Settings not found', statusCode: 404});
        }

        const errors = validator.validateUpdate(data);
        if(errors.length > 0){
            throw ({message: errors, statusCode: 400});
        }

        const updatedSettings = await settingsRepository.updateSettings(id, data);
        if(!updatedSettings){
            throw ({message: 'Settings not updated', statusCode: 500});
        }

        return settingsService.getSettings(id);
    },
};

export default settingsService;