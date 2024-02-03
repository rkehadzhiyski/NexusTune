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
    createdAt: string
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
        <div>
            <h1>{episode?.name}</h1>
            <AudioPlayer
                autoPlayAfterSrcChange={false}
                src={episode?.audio}
                volume={0.5}
            />
        </div>
    );
}

export default DetailsEpisode;