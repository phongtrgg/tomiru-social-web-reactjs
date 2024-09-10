import { axios } from "../core/axios";
import { UI_V1_IMAGE_EDIT_UPLOAD, UI_V1_IMAGE_UPLOAD, UI_V1_TWEETS_UPLOAD } from "../constants/endpoint-constants";

export const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();

    formData.append("file", image);

    // const { data } = await axios.post(UI_V1_IMAGE_UPLOAD, formData, {
    const { data } = await axios.post(UI_V1_TWEETS_UPLOAD, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data.src;
};
export const uploadMultiImages = async (images: File[]): Promise<any[]> => {
    const formData = new FormData();

    images.forEach((image) => {
        formData.append("files", image);
    });

    const { data } = await axios.post(UI_V1_TWEETS_UPLOAD, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data.map((d: any) => d.src);
};

export const uploadEditImage = async (image: File): Promise<{ id: number; src: string }> => {
    const formData = new FormData();
    formData.append("file", image);

    const { data } = await axios.post(UI_V1_IMAGE_EDIT_UPLOAD, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
};
