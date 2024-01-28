import { useEffect, useState } from "react";
import * as podcastService from '../../services/podcastService';

import PodcastCard from "../podcastCard/PodcastCard";

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string
}

const UserPodcasts = (userId: string) => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);

    useEffect(() => {
        podcastService.getAllOfOwner(userId)
            .then(response => {
                setPodcasts(response.data);
            })
            .catch(error => {
                console.error("Error fetching podcasts:", error);
            });
    }, [podcasts, userId]);

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            {podcasts.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
            ))}
        </div>
    );
}

export default UserPodcasts;