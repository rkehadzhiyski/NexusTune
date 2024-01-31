import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as userService from '../../services/userService';
import styles from './createEpisode.module.css';

import { Button, FloatingLabel, Form } from "react-bootstrap";
import AuthContext from '../../contexts/authContext';

interface PodcastData {
    name: string;
    description: string;
    image: string;
    createdAt: string;
    ownerId: string;
    _id: string;
}

interface FormData {
    name: string;
    episodeImage: unknown;
    episodeAudio: unknown;
    selectedPodcast: string;
    description: string;
}

const supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];
const supportedAudioFormats = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/aac'];

const isFileList = (value: object): value is FileList => value && value instanceof FileList;

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    episodeImage: yup.mixed().required('Image is required')
        .test('type', 'Unsupported file format', function (value) {
            if (!value) {
                return false;
            }
            const file = isFileList(value) ? value[0] : value;
            console.log('File type:', file);

            return file && supportedImageFormats.includes((file as File).type);
        }),
    episodeAudio: yup.mixed().required('audio is required')
        .test('type', 'Unsupported file format', function (value) {
            if (!value) {
                return false;
            }
            const file = isFileList(value) ? value[0] : value;
            console.log('File type:', file);

            return file && supportedAudioFormats.includes((file as File).type);
        }),
    selectedPodcast: yup.string().required('Please select a podcast'),
    description: yup.string().required('Description is required'),
});

const CreateEpisode = () => {
    const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
    const {
        user,
    } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        userService.getUploadedPodcast(user.userId)
            .then(response => {
                console.log(response.data);
                setPodcasts(response.data);
            })
            .catch(error => {
                console.error('Error fetching podcasts:', error);
            });
    }, [user.userId]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
    }

    return (
        <>
            {podcasts.length == 0
                ?
                <>
                    <h1>No Podcasts yet!</h1>
                </>
                :
                <div className={styles['create-podcast-page']}>
                    <div className={styles['podcast-info-container']}>
                        <h2>Information</h2>
                        <p className={styles['info-text']}>Please provide a name, an image, and a brief description for your episode.
                            This information will be displayed to listeners in the episode directory.
                            Make sure your image is clear and represents your episode well,
                            as it will be the first thing potential listeners see.
                        </p>
                    </div>

                    <div className={styles['create-podcast-form-container']}>
                        <Form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                            <h1 className={styles['heading']}>Create Episode</h1>
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
                            <Form.Label className={styles['image-label']}>Episode image</Form.Label>
                            <Form.Group controlId="formFileImage" className="mb-3">
                                <Form.Control
                                    type="file"
                                    {...register('episodeImage')}
                                    // onInput={handleFileChange}
                                    multiple={false}
                                    placeholder="episodeImage" />
                                <Form.Text className="text-danger">{errors['episodeImage']?.message}</Form.Text>
                            </Form.Group>
                            <Form.Label className={styles['image-label']}>Episode audio</Form.Label>
                            <Form.Group controlId="formFileAudio" className="mb-3">
                                <Form.Control
                                    type="file"
                                    {...register('episodeAudio')}
                                    // onInput={handleFileChange}
                                    multiple={false}
                                    placeholder="episodeAudio" />
                                <Form.Text className="text-danger">{errors['episodeAudio']?.message}</Form.Text>
                            </Form.Group>
                            <Form.Select className='mb-3' aria-label="Default select example" {...register('selectedPodcast')}>
                                <option>Select Podcast</option>
                                {podcasts.map(podcast => (
                                    <option key={podcast._id} value={podcast._id}>{podcast.name}</option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-danger">{errors['selectedPodcast']?.message}</Form.Text>
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
                </div >
            }
        </>
    );
}

export default CreateEpisode;