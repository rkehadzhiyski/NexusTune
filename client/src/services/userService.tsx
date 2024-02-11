import axios from "axios";

const baseUrl = '/users';

interface UserCredentials {
    email: string;
    password: string;
}

interface UserUpdate {
    image?: string;
    description?: string;
    uploadedPodcasts? : unknown;
}

export const login = async (credentials: UserCredentials) => {
    const result = await axios.post(`${baseUrl}/login`, credentials);
    return result;
};

export const register = async (credentials: UserCredentials) => {
    const result = await axios.post(`${baseUrl}/register`, credentials);
    return result;
};

export const logout = async () => {
    const result = await axios.get(`${baseUrl}/logout`);
    return result;
};

export const editUser = async (userId: string, updatedData: UserUpdate) => {
    const result = await axios.post(`${baseUrl}/edit/${userId}`, updatedData);
    return result;
}

export const updateUserPodcasts = async (userId: string, updatedData: UserUpdate) => {
    const result = await axios.put(`${baseUrl}/update/${userId}`, updatedData);
    return result;
} 

export const getOne = async(userId:string) => {
    const result = await axios.get(`${baseUrl}/user/${userId}`);
    return result;
}

export const getUploadedPodcast = async(userId:string) => {
    const result = await axios.get(`${baseUrl}/${userId}`);
    return result;
}
