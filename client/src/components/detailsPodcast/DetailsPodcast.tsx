import { useEffect } from "react";

import * as podcastService from '../../services/podcastService';
import { useParams } from "react-router-dom";

const DetailsPodcast = () => {
    const params = useParams();
    const { podcastId } = params;

    useEffect(() => {
        if (podcastId) {
            podcastService.getOne(podcastId)
                .then(response => {
                    console.log(response.data);
                })
        }

    },[podcastId]);

    return (
        <>
            <h1>Test</h1>
        </>
    );
}

export default DetailsPodcast;