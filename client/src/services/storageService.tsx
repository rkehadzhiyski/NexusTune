import { storage } from '../../firebase';
import { getDownloadURL, list, ref, uploadBytes, StorageReference } from 'firebase/storage';

interface UploadFileResponse {
    url: string;
}

export const uploadFile = async (audioUpload: File | undefined): Promise<UploadFileResponse | undefined> => {
    if (audioUpload == null) return;

    const folderRef = ref(storage, 'audio/');
    const audioRef = ref(storage, `audio/${audioUpload.name}`);

    try {
        await uploadBytes(audioRef, audioUpload);

        const response = await list(folderRef);

        response.items.map(async (item: StorageReference) => {
            const url = await getDownloadURL(item);
            return url;
        });
    } catch (error) {
        console.error("Error uploading or fetching audio:", error);
    }
};