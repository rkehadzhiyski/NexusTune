import axios from "axios";

const baseUrl = 'http://localhost:8888/podcasts';

interface uploadData {
    name: string;
    url: string;
    image: string;
}

export const create = async (data: uploadData) => {
    const result = await axios.post(baseUrl, data);
    return result
};