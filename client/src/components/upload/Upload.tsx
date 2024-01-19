import { ChangeEvent, useState } from "react";
import { storage } from '../../../firebase';
import { ref, uploadBytes } from 'firebase/storage';

const Upload = () => {
    const [audioUpload, setAudioUpload] = useState<File>();
    const uploadImage = () => {
        if (audioUpload == null) return;
        const audioRef = ref(storage, `audio/${audioUpload.name}`);
        
        uploadBytes(audioRef, audioUpload).then(() => {

        });
    };

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