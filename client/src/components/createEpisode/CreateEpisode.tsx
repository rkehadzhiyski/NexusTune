import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as userService from '../../services/userService';
import * as storageService from '../../services/storageService';
import * as episodeService from '../../services/episodeService';
import styles from './createEpisode.module.css';

import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Spinner } from 'react-bootstrap';
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

interface EpisodeData {
    name: string;
    image: string;
    audio: string;
    podcastId: string;
    description: string;
    createdAt: string;
    ownerId: string;
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

            return file && supportedImageFormats.includes((file as File).type);
        }),
    episodeAudio: yup.mixed().required('audio is required')
        .test('type', 'Unsupported file format', function (value) {
            if (!value) {
                return false;
            }
            const file = isFileList(value) ? value[0] : value;

            return file && supportedAudioFormats.includes((file as File).type);
        }),
    selectedPodcast: yup.string().required('Please select a podcast').test('not-empty', 'Please select a podcast', (value) => value !== ''),
    description: yup.string().required('Description is required'),
});

const CreateEpisode = () => {
    const [podcasts, setPodcasts] = useState<PodcastData[]>([]);
    const [episodeImage, setEpisodeImage] = useState<File>();
    const [episodeAudio, setEpisodeAudio] = useState<File>();
    const {
        user,
    } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userService.getUploadedPodcast(user.userId)
            .then(response => {
                setPodcasts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching podcasts:', error);
            });
    }, [user.userId]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const imageResponse = await storageService.uploadFile(user.userId, episodeImage);
            const audioResponse = await storageService.uploadFile(user.userId, episodeAudio);

            if (imageResponse?.url && audioResponse?.url) {
                const episodeData: EpisodeData = {
                    name: data.name,
                    image: imageResponse.url,
                    audio: audioResponse.url,
                    description: data.description,
                    createdAt: new Date().toISOString(),
                    podcastId: data.selectedPodcast,
                    ownerId: user.userId,
                }
                episodeService.create(episodeData);
            }

        } catch (error) {
            console.error('Error uploading files:', error);
        }
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setEpisodeImage(event.target.files[0]);
        }
    };

    const handleAudioChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setEpisodeAudio(event.target.files[0]);
        }
    };

    return (
        <div className={styles['spinner-container']}>
            {isLoading ? (
                <Spinner animation="grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
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
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <Form.Label className={styles['image-label']}>Episode image</Form.Label>
                                            <Form.Group controlId="formFileImage" className="mb-3">
                                                <Form.Control
                                                    type="file"
                                                    {...register('episodeImage')}
                                                    onInput={handleImageChange}
                                                    multiple={false}
                                                    placeholder="episodeImage" />
                                                <Form.Text className="text-danger">{errors['episodeImage']?.message}</Form.Text>
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <Form.Label className={styles['image-label']}>Episode audio</Form.Label>
                                            <Form.Group controlId="formFileAudio" className="mb-3">
                                                <Form.Control
                                                    type="file"
                                                    {...register('episodeAudio')}
                                                    onInput={handleAudioChange}
                                                    multiple={false}
                                                    placeholder="episodeAudio" />
                                                <Form.Text className="text-danger">{errors['episodeAudio']?.message}</Form.Text>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Form.Select className='mb-3' aria-label="Test" {...register('selectedPodcast')}>
                                        <option value=''>Select podcast</option>
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
            )}
        </div>
    )
};

export default CreateEpisode;