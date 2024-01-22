import { ChangeEvent, useState } from "react";
import { storage } from '../../../firebase';
import { getDownloadURL, list, ref, uploadBytes } from 'firebase/storage';

const Upload = () => {
    const [audioUpload, setAudioUpload] = useState<File>();
    const [audioUrl, setAudioUrl] = useState<string | null>();

    const uploadImage = async () => {
        if (audioUpload == null) return;

        const folderRef = ref(storage, 'audio/');
        const audioRef = ref(storage, `audio/${audioUpload.name}`);

        try {
            await uploadBytes(audioRef, audioUpload);

            const response = await list(folderRef);

            response.items.map(async (item) => {
                const url = await getDownloadURL(item);
                setAudioUrl(url);
            });
        } catch (error) {
            console.error("Error uploading or fetching audio:", error);
        }
    };
    
    //TODO : send the url to the database
    console.log(audioUrl)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setAudioUpload(event.target.files[0]);
        }
    };

    return (
        <>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadImage}>Upload</button>
        </>
    );
}

export default Upload;