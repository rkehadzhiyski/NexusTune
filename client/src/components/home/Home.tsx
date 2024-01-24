import { useState, useEffect } from "react";
import * as podcastService from '../../services/podcastService';

import PodcastCard from "../podcastCard/PodcastCard";

interface Podcast {
    id: number;
    name: string;
    description: string;
    image:string
}

const Home = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);

    useEffect(() => {
        podcastService.getAll()
            .then(response => {
                // Update the state with the fetched podcasts
                console.log(response);
                setPodcasts(response.data);
            })
            .catch(error => {
                console.error("Error fetching podcasts:", error);
            });
    }, []);

    return (
        <>
            {podcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast}/>
            ))} 
        </>
    );
}

export default Home;