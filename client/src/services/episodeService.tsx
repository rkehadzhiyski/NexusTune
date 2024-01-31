import axios from 'axios';

const baseUrl = 'http://localhost:8888/episodes';

interface uploadData {
    name: string;
    image: string;
    audio: string;
    podcastId: string;
    description: string;
    createdAt: string;
    ownerId: string;
}

export const create = async (data: uploadData) => {
    const result = await axios.post(baseUrl, data);
    return result;
};