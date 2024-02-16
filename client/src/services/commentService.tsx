import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_COMMENT_URL;

export const create = async (data: string) => {
    const result = await axios.post(baseUrl, data);
    return result;
};