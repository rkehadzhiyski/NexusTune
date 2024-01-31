import { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import AuthContext from '../../contexts/authContext';

import * as userService from '../../services/userService';
import styles from './createEpisode.module.css';

interface PodcastData {
    name: string;
    description: string;
    image: string;
    createdAt: string;
    ownerId: string;
    _id: string;
}

const CreateEpisode = () => {
    const {
        user,
    } = useContext(AuthContext);
    const [podcasts, setPodcasts] = useState<PodcastData[]>([]);

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
                        <Form className={styles['form']}>
                            <h1 className={styles['heading']}>Create Episode</h1>
                            <FloatingLabel label="Name" className="mb-3" controlId="formGroupName">
                                <Form.Control
                                    type="name"
                                    // {...register('name')}
                                    placeholder="Enter a name"
                                    autoComplete="name-input"
                                />
                                {/* <Form.Text className="text-danger">{errors['name']?.message}</Form.Text> */}
                            </FloatingLabel>
                            <Form.Text className="text-muted">
                            </Form.Text>
                            <Form.Label className={styles['image-label']}>Episode image</Form.Label>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control
                                    type="file"
                                    // {...register('profileImage')}
                                    // onInput={handleFileChange}
                                    multiple={false}
                                    placeholder="Profile Image" />
                                {/* <Form.Text className="text-danger">{errors['profileImage']?.message}</Form.Text> */}
                            </Form.Group>
                            <Form.Select className='mb-3' aria-label="Default select example">
                                <option>Select Podcast</option>
                                {podcasts.map(podcast => (
                                    <option key={podcast._id}>{podcast.name}</option>
                                ))}

                            </Form.Select>
                            <FloatingLabel className='mb-3' label="Description" controlId="formGroupDescription">
                                <Form.Control
                                    style={{ height: '100px' }}
                                    as={'textarea'}
                                    type="text"
                                    // {...register('description')}
                                    placeholder="Description"
                                    autoComplete="description"
                                />
                                {/* <Form.Text className="text-danger">{errors['description']?.message}</Form.Text> */}
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