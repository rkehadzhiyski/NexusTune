import { ChangeEvent, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { create } from '../../services/podcastService';
import { uploadFile } from '../../services/storageService';

import AuthContext from '../../contexts/authContext';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface FormData {
    name: string;
    audioFile: string;
    image: string;
}

interface CreatePodcastData {
    name: string;
    url: string;
    image: string;
    ownerId: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    audioFile: yup.string().required('File is required'),
    image: yup.string().required('Picture is required'),
});

const Upload = () => {
    const [audioUpload, setAudioUpload] = useState<File>();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const {
        user,
    } = useContext(AuthContext)

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await uploadFile(audioUpload);
        if (response && response.url) {
            const createData: CreatePodcastData = {
                name: data.name,
                url: response.url,
                image: data.image,
                ownerId: user.userId,
            };
            create(createData)
        } else {
            console.error("Upload failed. URL is undefined.");
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setAudioUpload(event.target.files[0]);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel label="Name" className="mb-3" controlId="formGroupName">
                    <Form.Control
                        type="name"
                        {...register('name')}
                        placeholder="Enter a name"
                        autoComplete="name-input"
                    />
                    <Form.Text className="text-danger">{errors['name']?.message}</Form.Text>
                </FloatingLabel>
                <FloatingLabel label="Image" className="mb-3" controlId="formGroupImage">
                    <Form.Control
                        type="text"
                        {...register('image')}
                        placeholder="Image"
                        autoComplete="current-image"
                    />
                    <Form.Text className="text-danger">{errors['image']?.message}</Form.Text>
                </FloatingLabel>
                <Form.Text className="text-muted">
                </Form.Text>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                        type="file"
                        {...register('audioFile')}
                        onChange={handleFileChange}
                        placeholder="Submit File" />
                </Form.Group>
                <div>
                    <Button variant="primary" type="submit">
                        Upload
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default Upload;