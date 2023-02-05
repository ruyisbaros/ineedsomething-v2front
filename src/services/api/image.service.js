import axios from '@services/axios';

class ImageService {
    async getUserImages(userId) {
        const response = await axios.get(`/images/get/${userId}`);
        return response;
    }

    async addImage(url, data) {
        const response = await axios.post(url, { image: data });
        return response;
    }

    async removeImage(url) {
        const response = await axios.delete(url);
        return response;
    }
}

export const imageService = new ImageService();

/*
   router.post("/profile_img", protect, validatePostWithImage, imageCtrl.addProfileImage);
   router.post("/bg_img", protect, validatePostWithImage, imageCtrl.addBackgroundImage);
   router.delete("/delete/:imageId", protect, imageCtrl.deleteAnyImage);
   router.delete("/delete_bg/:bgImageId", protect, imageCtrl.deleteBgImage);
   router.get("/get/:userId", protect, imageCtrl.getUserImages);
 */