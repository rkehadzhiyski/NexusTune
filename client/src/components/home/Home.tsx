import { useState, useEffect } from "react";
import * as podcastService from '../../services/podcastService';

import PodcastCard from "../podcastCard/PodcastCard";

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string
}

const Home = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);

    useEffect(() => {
        podcastService.getAll()
            .then(response => {
                setPodcasts(response.data);
            })
            .catch(error => {
                console.error("Error fetching podcasts:", error);
            });
    }, []);

    return (
        <>
            <div style={{ display: 'flex',justifyContent: 'center' ,gap: '20px',flexWrap: 'wrap' }}>
                {podcasts.map((podcast) => (
                    <PodcastCard key={podcast._id} podcast={podcast} />
                ))}
            </div>
        </>
    );
}

export default Home;