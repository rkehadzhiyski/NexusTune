import { useState, useEffect } from "react";
import * as podcastService from '../../services/podcastService';

import styles from './home.module.css';

import PodcastCard from "../podcastCard/PodcastCard";
import Latest from "../latest/Latest";

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
}

const Home = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [latestPodcasts, setLatestPodcasts] = useState<Podcast[]>([]);

    useEffect(() => {
        podcastService.getLatest()
            .then(response => {
                setLatestPodcasts(response.data);
            })
            .catch(error => {
                console.error("Error fetching podcasts:", error);
            });

        podcastService.getAll()
            .then(response => {
                setPodcasts(response.data);
            })
            .catch(error => {
                console.error("Error fetching podcasts:", error);
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
                    <div className={styles['border']}></div>
                    < Latest latestPodcasts={latestPodcasts} />
                    <div className={styles['border']}></div>
                </>
            }
            <section style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {podcasts.map((podcast) => (
                    <PodcastCard key={podcast._id} podcast={podcast} />
                ))}
            </section>
        </div>
    );
}

export default Home;