import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as episodeService from '../../services/episodeService';

import styles from './detailsEpisode.module.css';
import 'react-h5-audio-player/lib/styles.css';

import AudioPlayer from 'react-h5-audio-player';
import { Image } from "react-bootstrap";

interface Episode {
    _id: number;
    name: string;
    description: string;
    image: string;
    audio: string;
    createdAt: string;
    duration: number;
    podcastId: string;
}

const DetailsEpisode = () => {
    const [episode, setEpisode] = useState<Episode>();
    const navigate = useNavigate();
    const params = useParams();
    const { episodeId, podcastName } = params;

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

    const navigateTo = () => {
        navigate(`/podcast/${episode?.podcastId}`);
    }

    return (
        // <div className={styles['episode-details-page']}>
        //     <div className={styles['episode-details-container']}>
        //         <h1>{episode?.name}</h1>
        //         <AudioPlayer
        //             autoPlayAfterSrcChange={false}
        //             src={episode?.audio}
        //             volume={0.5}
        //         />
        //         <div className={styles['episode-details-bottom-section']}>
        //             <div className={styles['episode-description']}>
        //                 <p>{episode?.description}</p>
        //             </div>
        //             <div className={styles['user-description']}>
        //                 <img className={styles['user-photo']} src='https://wallpapers.com/images/featured/cute-aesthetic-profile-pictures-pjfl391j3q0f7rlz.jpg' alt='profile-photo' />
        //                 <p>Username</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className={styles['episode-details-page']}>
            <section className={styles['top-section']}>
                <div>
                    <Image className={styles['episode-image']} src={episode?.image} alt='Episode-image' />
                </div>
                <div className={styles['episode-name-container']}>
                    <div><h2>{episode?.name}</h2></div>
                    <div className={styles['podcast-name']} onClick={navigateTo}><h5>{podcastName}</h5></div>
                </div>
            </section>

            <div className={styles['line']}></div>
            <div className={styles['gradient']}>
                <section className={styles['middle-section']}>
                    <div className={styles['player-container']}>
                        <AudioPlayer
                            autoPlayAfterSrcChange={false}
                            src={episode?.audio}
                            volume={0.5}
                            style={{ boxShadow: 'none' }}
                        />
                    </div>
                </section>

                <section className={styles['bottom-section']}>
                    <h2 className={styles['episode-description-title']}>Episode Description</h2>
                    <p className={styles['episode-description']}>
                        {episode?.description}
                    </p>
                </section>
            </div>
        </div>
    );
}

export default DetailsEpisode;