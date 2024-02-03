import { createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import * as userService from '../services/userService';
import usePersistedState from '../hooks/usePersistedState';

interface AuthContextProps {
    children: ReactNode;
}

interface UserData {
    email: string;
    username: string;
    userId: string;
    accessToken?: string;
    image?: string;
}

interface AuthValues {
    registerSubmitHandler: (values: { email: string; password: string; username: string }) => Promise<void>;
    loginSubmitHandler: (values: { email: string; password: string }) => Promise<void>;
    logoutHandler: () => void;
    updateAuth: (userImage: string) => void;
    user: UserData;
    isAuthenticated: boolean;
}

const initialAuthValues: AuthValues = {
    registerSubmitHandler: async () => { },
    loginSubmitHandler: async () => { },
    logoutHandler: () => { },
    updateAuth: () => { },
    user: {
        email: '',
        username: '',
        userId: '',
        accessToken: '',
        image: '',
    },
    isAuthenticated: false,
};

const AuthContext = createContext<AuthValues>(initialAuthValues);

export const AuthProvider: React.FC<AuthContextProps> = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState<UserData>('auth', {
        email: '',
        username: '',
        userId: '',
    });

    const registerSubmitHandler = async (values: { email: string; password: string; username: string }): Promise<void> => {
        const response = await userService.register(values);
        const result = response.data;

        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);

        navigate('/');
    };

    const loginSubmitHandler = async (values: { email: string; password: string }) => {
        const response = await userService.login(values);
        const result = response.data;

        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);

        navigate('/');
    }

    const updateAuth = (userImage: string) => {
        const newAuth = {
            email: auth.email,
            username: auth.username,
            userId: auth.userId,
            image: userImage,
            accessToken: auth.accessToken,
        }

        setAuth(newAuth);
    }

    const logoutHandler = async () => {
        await userService.logout()
        //TODO : Might need to handle this otherwise
        setAuth({
            email: '',
            username: '',
            userId: ''
        });

        localStorage.removeItem('accessToken');
    }

    const values = {
        registerSubmitHandler,
        loginSubmitHandler,
        logoutHandler,
        updateAuth,
        user: {
            email: auth.email || '',
            username: auth.username || '',
            userId: auth.userId || '',
            accessToken: auth.accessToken || '',
            image: auth.image || '',
        },
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;