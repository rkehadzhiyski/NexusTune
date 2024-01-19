import { useState } from "react";
import { storage } from '../../../firebase';
import { ref, uploadBytes } from 'firebase/storage';

const Upload = () => {
    const [audioUpload, setAudioUpload] = useState();
    const uploadImage = () => {
        if (audioUpload == null) return;
        const audioRef = ref(storage, `audio/${audioUpload.name}`);
        
        uploadBytes(audioRef, audioUpload).then(() => {

        });
    };

    return (
        <>
            <input type="file" onChange={(event) => { setAudioUpload(event.target.files[0]) }} />
            <button onClick={uploadImage}>Upload</button>
        </>
    );
}

export default Upload;