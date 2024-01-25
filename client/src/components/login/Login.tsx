import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './login.module.css';

import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../contexts/authContext';

interface FormData {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be atleast 6 characters long').required('Password is required'),
});

const Login: FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (authContext) {
            authContext.loginSubmitHandler(data);
        }
    };

    const navigateRegister = () => {
        navigate('/register');
    };
    return (
        <div className={styles['login-page']}>
            <div className={styles['login-form-container']}>
                <h2 className={styles['heading']}>Login</h2>
                <Form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                    <FloatingLabel label="Email address" className={(styles['form-fields'], 'mb-3')} controlId="formGroupEmail">
                        <Form.Control
                            
                            type="email"
                            {...register('email')}
                            placeholder="Enter email"
                            autoComplete="email-input"
                        />
                        <Form.Text className="text-danger">{errors['email']?.message}</Form.Text>
                    </FloatingLabel>
                    <FloatingLabel label="Password" className={(styles['form-fields'], 'mb-3')} controlId="formGroupPassword">
                        <Form.Control
                            type="password"
                            {...register('password')}
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                        <Form.Text className="text-danger">{errors['password']?.message}</Form.Text>
                    </FloatingLabel>
                    <div>
                        <Button className={styles['login-button']} variant="primary" type="submit">
                            Login
                        </Button>
                    </div>
                    <Form.Text className="text-muted">
                        Already a registered user?
                        <span className={styles['underline-pointer']} onClick={navigateRegister}>
                            Register now
                        </span>.
                    </Form.Text>
                </Form>
            </div>
        </div>
    );
};

export default Login;