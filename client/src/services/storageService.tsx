import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface UploadFileResponse {
    url: string;
}

export const uploadFile = async (userId:string,fileUpload: File | undefined): Promise<UploadFileResponse | undefined> => {
    if (fileUpload == null) return ;
    
    const audioRef = ref(storage, `${userId}/${fileUpload.name}`);

    try {
        await uploadBytes(audioRef, fileUpload);

        const url = await getDownloadURL(audioRef);
        
        return { url };
    } catch (error) {
        console.error("Error uploading or fetching file:", error);
    }
};