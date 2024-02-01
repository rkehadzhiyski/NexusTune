import { useEffect, useState } from "react";

import * as podcastService from '../../services/podcastService';
import { useParams } from "react-router-dom";
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
    createdAt: string
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
        <div>
            <h1>{podcast?.name}</h1>
            {episodes?.map(episode => (
                <EpisodeCard key={episode._id} episode={episode} />
            ))}
        </div>
    );
}

export default DetailsPodcast;