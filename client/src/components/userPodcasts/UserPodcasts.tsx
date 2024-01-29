import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as podcastService from '../../services/podcastService';
import styles from './userPodcasts.module.css';

import PodcastCard from "../podcastCard/PodcastCard";
import Button from 'react-bootstrap/Button';

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string
}

interface Props {
    userId: string;
}

const UserPodcasts: React.FC<Props> = ({ userId }) => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate('/create-podcast')
    }

    useEffect(() => {
        podcastService.getAllOfOwner(userId)
            .then(response => {
                setPodcasts(response.data);
            })
            .catch(error => {
                console.error("Error fetching podcasts:", error);
            });
    }, [userId]);

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {podcasts.length === 0 ? (
                <div className={styles['no-podcast-info']}>
                    <p>You have no podcasts yet.</p>
                    <Button onClick={navigateTo} variant="primary" >
                        Upload
                    </Button>
                </div>
            ) : (
                podcasts.map((podcast) => (
                    <PodcastCard key={podcast._id} podcast={podcast} />
                ))
            )}
        </div>
    );
}

export default UserPodcasts;