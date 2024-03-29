import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_EPISODE_URL;

interface uploadData {
    name: string;
    image: string;
    audio: string;
    podcastId: string;
    description: string;
    createdAt: string;
    duration: number;
    ownerId: string;
}

export const create = async (data: uploadData) => {
    const result = await axios.post(baseUrl!, data);
    return result;
};

export const getOne = async (episodeId: string) => {
    const result = await axios.get(`${baseUrl}/${episodeId}`);
    return result;
};

export const getLatest = async () => {
    const result = await axios.get(`${baseUrl}/latest/episodes`);
    return result;
}