import { ChangeEvent, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from '../createPodcast/createPodcast.module.css';
import * as podcastService from '../../services/podcastService';
import * as userService from '../../services/userService';

import AuthContext from '../../contexts/authContext';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { uploadFile } from '../../services/storageService';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    description: string;
    podcastImage: unknown;
}

interface CreatePodcastData {
    name: string;
    description: string;
    image: string;
    createdAt: string;
    ownerId: string;
}

const supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];

const isFileList = (value: object): value is FileList => value && value instanceof FileList;

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    podcastImage: yup.mixed().required('Image is required')
        .test('type', 'Unsupported file format', function (value) {
            if (!value) {
                return false;
            }
            const file = isFileList(value) ? value[0] : value;

            return file && supportedImageFormats.includes((file as File).type);
        }),
    description: yup.string().required('Description is required'),
});

const CreatePodcast = () => {
    const navigate = useNavigate();
    const [podcastImage, setPodcastImage] = useState<File>();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const {
        user,
    } = useContext(AuthContext);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const response = await uploadFile(user.userId, podcastImage);

            if (response && response.url) {
                const podcastData: CreatePodcastData = {
                    name: data.name,
                    image: response.url,
                    description: data.description,
                    createdAt: new Date().toISOString(),
                    ownerId: user.userId,
                };

                const podcastId = await podcastService.create(podcastData);
                userService.updateUserPodcasts(user.userId, { uploadedPodcasts: podcastId.data });
                navigate(`/podcast/${podcastId.data}`)
            }

        } catch (error) {
            console.error('Error uploading files:', error);
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPodcastImage(event.target.files[0]);
        }
    };

    return (
        <div className={styles['create-podcast-page']}>
            <div className={styles['create-podcast-form-container']}>
                <Form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles['heading']}>Create Podcast</h1>
                    <FloatingLabel label="Name" className="mb-3" controlId="formGroupName">
                        <Form.Control
                            type="name"
                            {...register('name')}
                            placeholder="Enter a name"
                            autoComplete="name-input"
                        />
                        <Form.Text className="text-danger">{errors['name']?.message}</Form.Text>
                    </FloatingLabel>
                    <Form.Text className="text-muted">
                    </Form.Text>
                    <Form.Label className={styles['image-label']}>Podcast image</Form.Label>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                            type="file"
                            {...register('podcastImage')}
                            onChange={handleFileChange}
                            multiple={false}
                            placeholder="Profile Image" />
                        <Form.Text className="text-danger">{errors['podcastImage']?.message}</Form.Text>
                    </Form.Group>
                    <FloatingLabel className='mb-3' label="Description" controlId="formGroupDescription">
                        <Form.Control
                            style={{ height: '150px' }}
                            as={'textarea'}
                            type="text"
                            {...register('description')}
                            placeholder="Description"
                            autoComplete="description"
                        />
                        <Form.Text className="text-danger">{errors['description']?.message}</Form.Text>
                    </FloatingLabel>
                    <div>
                        <Button className={styles['create-podcast-button']} variant="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </Form>
            </div>

            <div className={styles['podcast-info-container']}>
                <h2>Information</h2>
                <p className={styles['info-text']}>Please provide a name, an image, and a brief description for your podcast.
                    This information will be displayed to listeners in the podcast directory.
                    Make sure your image is clear and represents your podcast well,
                    as it will be the first thing potential listeners see.
                </p>
            </div>
        </div>
    );
}

export default CreatePodcast;