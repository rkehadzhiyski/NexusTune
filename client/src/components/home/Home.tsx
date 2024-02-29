import { useState, useEffect } from "react";

import * as podcastService from '../../services/podcastService';
import * as episodeService from '../../services/episodeService';

import styles from './home.module.css';

import Latest from "../latest/Latest";

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
}

interface Episode {
    _id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
}

const Home = () => {
    const [latestPodcasts, setLatestPodcasts] = useState<Podcast[]>([]);
    const [latestEpisodes, setLatestEpisodes] = useState<Episode[]>([]);

    useEffect(() => {
        podcastService.getLatest()
            .then(response => {
                setLatestPodcasts(response.data);
            })
            .catch(error => {
                console.error("Error fetching podcasts:", error);
            });

        episodeService.getLatest()
            .then(response => {
                setLatestEpisodes(response.data);
            })
            .catch(error => {
                console.error("Error fetching episodes:", error);
            });
    }, []);

    return (
        <div className={styles['home-page']}>
            <div className={styles['intro-text']}>
                <img className={styles['logo']} src='/Nexus Tunes-logos_transparent.png' alt="nexus-tunes-logo" />
                <p>
                    Welcome to Nexus Tunes, where every story finds its voice. Dive into a world of captivating narratives,
                    insightful conversations, and thought-provoking episodes curated just for you. Whether you're a seasoned enthusiast or a curious explorer,
                    embark on a journey of discovery with our diverse collection of podcasts. Tune in, explore, and let the stories unfold.
                </p>
            </div>
            {latestPodcasts.length > 0 &&
                <>
                    <div className={styles['line']}></div>
                    < Latest type='podcast' latest={latestPodcasts} />
                    <div className={styles['line']}></div>
                </>
            }

            {latestEpisodes.length > 0 &&
                <>
                    < Latest type='episode' latest={latestEpisodes} />
                    <div className={styles['line']}></div>
                </>
            }
        </div>
    );
}

export default Home;