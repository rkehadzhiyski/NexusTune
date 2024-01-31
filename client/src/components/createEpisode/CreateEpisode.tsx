import { useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import AuthContext from '../../contexts/authContext';

import * as userService from '../../services/userService';

interface PodcastData {
    name: string;
    description: string;
    image: string;
    createdAt: string;
    ownerId: string;
}

const CreateEpisode = () => {
    const {
        user,
    } = useContext(AuthContext);
    const [podcasts, setPodcasts] = useState<PodcastData[]>([]);

    useEffect(() => {
        userService.getUploadedPodcast(user.userId)
            .then(response => {
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
                <Form>
                    <h1 >Create Episode</h1>
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
                    <Form.Label >Upload  image</Form.Label>
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
                        <option>Open this select menu</option>
                        {podcasts.map(podcast => (
                            <option key={podcast.name}>{podcast.name}</option>
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
                    <Button variant="primary" type="submit">Edit</Button>
                </Form>
            }
        </>
    );
}

export default CreateEpisode;