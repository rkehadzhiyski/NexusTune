import axios from "axios";

const baseUrl = 'http://localhost:8888/podcasts';

interface uploadData {
    name: string;
    image: string;
    description: string;
    createdAt: string
}

export const create = async (data: uploadData) => {
    const result = await axios.post(baseUrl, data);
    return result
};

export const getAll = async () => {
    const result = await axios.get(baseUrl);
    return result;
}

export const getAllOfOwner = async(ownerId:string) => {
    const result = await axios.get(`${baseUrl}/owner/${ownerId}`);
    return result;
}