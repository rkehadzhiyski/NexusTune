import { ChangeEvent, useState } from "react";
import { uploadFile } from '../../services/storageService';


const Upload = () => {
    const [audioUpload, setAudioUpload] = useState<File | undefined>();
    const [audioUrl, setAudioUrl] = useState<string | undefined>();

    const onClick = async () => {
        if (audioUpload) {
            try {
                const result = await uploadFile(audioUpload);
                if (result) {
                    setAudioUrl(result.url);
                }
            } catch (error) {
                console.error("Error uploading or fetching audio:", error);
            }
        }
    };

    //TODO : send the url to the database
    console.log(audioUrl);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setAudioUpload(event.target.files[0]);
        }
    };

    return (
        <>
            <input type="file" onChange={handleFileChange} />
            <button onClick={onClick}>Upload</button>
        </>
    );
}

export default Upload;