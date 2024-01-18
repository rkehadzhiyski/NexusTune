import { useNavigate } from 'react-router-dom';
import { useContext, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AuthContext from '../../contexts/authContext';

import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface FormData {
    username: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

const Register: FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if(authContext){
            authContext.registerSubmitHandler(data);
        }
    };

    const navigateLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel label="Username" className="mb-3" controlId="formGroupUsername">
                    <Form.Control
                        type="username"
                        {...register('username')}
                        placeholder="Enter username"
                        autoComplete="username"
                    />
                    <Form.Text className="text-danger">{errors['username']?.message}</Form.Text>
                </FloatingLabel>
                <FloatingLabel label="Email address" className="mb-3" controlId="formGroupEmail">
                    <Form.Control
                        type="email"
                        {...register('email')}
                        placeholder="email"
                        autoComplete='email'
                    />
                    <Form.Text className="text-danger">{errors['email']?.message}</Form.Text>
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3" controlId="formGroupPassword">
                    <Form.Control
                        type="password"
                        {...register('password')}
                        placeholder="Password"
                        autoComplete="current-password"
                    />
                    <Form.Text className="text-danger">{errors['username']?.message}</Form.Text>
                </FloatingLabel>
                <Form.Text className="text-muted">
                    Already have an account? <span onClick={navigateLogin}>Login</span>.
                </Form.Text>
                <div>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Register;
