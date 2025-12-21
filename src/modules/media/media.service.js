import cloudinary from '../../config/cloudinary.config.js';

const mediaService = {
    uploadImage: async (file, folder, publicId) => {  
        const result = await cloudinary.uploader.upload(file.path, {
            folder,
            public_id: publicId,
            resource_type: 'image',
            overwrite: true,
        });

        return result.secure_url;
    },

    uploadShorts: async (file, folder, publicId) => {  
        const result = await cloudinary.uploader.upload(file.path, {
            folder,
            public_id: publicId,
            resource_type: 'video',
            overwrite: true,
        });

        return result.secure_url;
    }
}

export default mediaService;