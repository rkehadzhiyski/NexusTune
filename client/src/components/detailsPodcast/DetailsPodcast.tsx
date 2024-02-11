import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as podcastService from '../../services/podcastService';
import styles from './detailsPodcast.module.css';

import EpisodeCard from "../episodeCard/EpisodeCard";

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string;
}

interface Episode {
    _id: number;
    name: string;
    description: string;
    image: string;
    audio: string;
    createdAt: string;
    duration: number;
}

const DetailsPodcast = () => {
    const [podcast, setPodcast] = useState<Podcast>();
    const [episodes, setEpisodes] = useState<Episode[]>()
    const params = useParams();
    const { podcastId } = params;

    useEffect(() => {
        if (podcastId) {
            podcastService.getOne(podcastId)
                .then(response => {
                    setPodcast(response.data)
                }).catch(error => {
                    console.error('Error fetching podcast:', error);
                });

            podcastService.getEpisodes(podcastId)
                .then(response => {
                    setEpisodes(response.data)
                }).catch(error => {
                    console.error('Error fetching episodes:', error);
                });
        }

    }, [podcastId]);

    return (
        <div className={styles['podcast-details-page']}>
            <div className={styles['podcast-info']}>
                <h1>{podcast?.name}</h1>
                <div className={styles['podcast-description']}>
                    <p>{podcast?.description}</p>
                </div>
            </div>
            <div className={styles['episodes-section']}>
                <h2 className={styles['title']}>Episodes</h2>
                {episodes && episodes?.length > 0 &&
                    <>
                        <div className={styles['line']}></div>
                        <div className={styles['episodes']}>
                            {episodes?.map(episode => (
                                <EpisodeCard key={episode._id} episode={episode} podcast={podcast?.name}/>
                            ))}
                        </div>
                    </>
                }

                {episodes?.length == 0 &&
                    <p>There are no episodes for this podcast yet!</p>
                }
            </div>
        </div>
    );
}

export default DetailsPodcast;