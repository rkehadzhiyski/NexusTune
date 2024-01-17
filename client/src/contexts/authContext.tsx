import { createContext, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import * as userService from '../services/userService';

interface AuthContextProps {
    children: ReactNode;
}

interface AuthValues {
    registerSubmitHandler: (values: { email: string; password: string; username: string }) => Promise<void>;
    loginSubmitHandler: (values: { email: string; password: string }) => Promise<void>;
    // logoutHandler: () => void;
    // username: string;
    // email: string;
    // userId: string;
    // isAuthenticated: boolean;
}

const AuthContext = createContext<AuthValues | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({
    children,
}) => {
    const navigate = useNavigate();

    const registerSubmitHandler = async (values: { email: string; password: string; username: string }): Promise<void> => {
        const response = await userService.register(values);

        const result = response.data;

        localStorage.setItem('accessToken', result.accessToken);

        navigate('/');
    };

    const loginSubmitHandler = async (values: { email: string; password: string }) => {
        const response = await userService.login(values);

        const result = response.data;

        localStorage.setItem('accessToken', result.accessToken);

        navigate('/');
    }


    const values = {
        registerSubmitHandler,
        loginSubmitHandler,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;