import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface UploadFileResponse {
    url: string;
}

export const uploadFile = async (audioUpload: File | undefined): Promise<UploadFileResponse | undefined> => {
    if (audioUpload == null) return;

    const audioRef = ref(storage, `audio/${audioUpload.name}`);

    try {
        await uploadBytes(audioRef, audioUpload);

        const url = await getDownloadURL(audioRef);
        
        return { url };
    } catch (error) {
        console.error("Error uploading or fetching audio:", error);
    }
};