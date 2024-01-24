import { ChangeEvent, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as podcast from '../../services/podcastService';

import AuthContext from '../../contexts/authContext';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { uploadFile } from '../../services/storageService';

interface FormData {
    name: string;
    description: string;
    podcastImage: string;
}

interface CreatePodcastData {
    name: string;
    description: string;
    image: string;
    createdAt: string;
    ownerId: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    podcastImage: yup.string().required('File is required'),
    description: yup.string().required('Description is required'),
});

const CreatePodcast = () => {
    const [podcastImage, setPodcastImage] = useState<File>();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const {
        user,
    } = useContext(AuthContext);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await uploadFile(podcastImage);
        if (response && response.url) {
            const podcastData: CreatePodcastData = {
                name: data.name,
                image: response.url,
                description: data.description,
                createdAt: new Date().toISOString(),
                ownerId: user.userId,
            };
            podcast.create(podcastData);
        } else {
            console.error("Upload failed!");
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPodcastImage(event.target.files[0]);
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
                <FloatingLabel label="description" className="mb-3" controlId="formGroupImage">
                    <Form.Control
                        type="text"
                        {...register('description')}
                        placeholder="Description"
                        autoComplete="current-image"
                    />
                    <Form.Text className="text-danger">{errors['description']?.message}</Form.Text>
                </FloatingLabel>
                <Form.Text className="text-muted">
                </Form.Text>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                        type="file"
                        {...register('podcastImage')}
                        onChange={handleFileChange}
                        placeholder="Profile Image" />
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

export default CreatePodcast;