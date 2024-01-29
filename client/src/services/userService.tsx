import axios from "axios";

const baseUrl = 'http://localhost:8888/users';

interface UserCredentials {
    email: string;
    password: string;
}

interface UserUpdate {
    image?: string;
    description?: string;
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

export const getOne = async(userId:string) => {
    const result = await axios.get(`${baseUrl}/user/${userId}`);
    return result;
}
