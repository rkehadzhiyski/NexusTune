import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as episodeService from '../../services/episodeService';

interface Episode {
    _id: number;
    name: string;
    description: string;
    image: string;
    audio: string;
    createdAt: string
}

const DetailsEpisode = () => {
    const [episode,setEpisode] = useState<Episode>();
    const params = useParams();
    const { episodeId } = params;
    
    useEffect(()=>{
        if (episodeId) {            
            episodeService.getOne(episodeId)
                .then(response => {
                    setEpisode(response.data)
                }).catch(error => {
                    console.error('Error fetching episodes:', error);
                });
        }
    },[episodeId])

    return (
        <>
        <h1>{episode?.name}</h1>
        <audio controls src={episode?.audio}></audio>
        </>
    );
}

export default DetailsEpisode;