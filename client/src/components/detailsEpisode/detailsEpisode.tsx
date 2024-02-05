import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as episodeService from '../../services/episodeService';
import styles from './detailsEpisode.module.css';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface Episode {
    _id: number;
    name: string;
    description: string;
    image: string;
    audio: string;
    createdAt: string;
    duration: number;
}

const DetailsEpisode = () => {
    const [episode, setEpisode] = useState<Episode>();
    const params = useParams();
    const { episodeId } = params;

    useEffect(() => {
        if (episodeId) {
            episodeService.getOne(episodeId)
                .then(response => {
                    setEpisode(response.data)
                }).catch(error => {
                    console.error('Error fetching episodes:', error);
                });
        }
    }, [episodeId])

    return (
        <div className={styles['episode-details-page']}>
            <div className={styles['episode-details-container']}>
                <h1>{episode?.name}</h1>
                <AudioPlayer
                    autoPlayAfterSrcChange={false}
                    src={episode?.audio}
                    volume={0.5}
                />
                <div className={styles['episode-details-bottom-section']}>
                    <div className={styles['episode-description']}>
                        <p>{episode?.description}</p>
                    </div>
                    <div className={styles['user-description']}>
                        <img className={styles['user-photo']} src='https://wallpapers.com/images/featured/cute-aesthetic-profile-pictures-pjfl391j3q0f7rlz.jpg' alt='profile-photo' />
                        <p>Username</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsEpisode;