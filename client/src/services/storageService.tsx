import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface UploadFileResponse {
    url: string;
}

export const uploadFile = async (userId:string,fileUpload: File | undefined): Promise<UploadFileResponse | undefined> => {
    if (fileUpload == null) return ;
    
    const fileRef = ref(storage, `${userId}/${fileUpload.name}`);

    try {
        await uploadBytes(fileRef, fileUpload);

        const url = await getDownloadURL(fileRef);
        
        return { url };
    } catch (error) {
        console.error("Error uploading or fetching file:", error);
    }
};