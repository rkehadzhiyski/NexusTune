import { useNavigate } from 'react-router-dom';
import { useContext, FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './register.module.css';
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
        if (authContext) {
            authContext.registerSubmitHandler(data);
        }
    };

    const navigateLogin = () => {
        navigate('/login');
    };

    return (
        <div className={styles['register-page']}>
            <div className={styles['register-form-container']}>
                <h2 className={styles['heading']}>Register</h2>
                <Form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                    <FloatingLabel label="Username" className={(styles['form-fields'], 'mb-3')} controlId="formGroupUsername">
                        <Form.Control
                            type="username"
                            {...register('username')}
                            placeholder="Enter username"
                            autoComplete="username"
                        />
                        <Form.Text className="text-danger">{errors['username']?.message}</Form.Text>
                    </FloatingLabel>
                    <FloatingLabel label="Email address" className={(styles['form-fields'], 'mb-3')} controlId="formGroupEmail">
                        <Form.Control
                            type="email"
                            {...register('email')}
                            placeholder="email"
                            autoComplete='email'
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
                        <Form.Text className="text-danger">{errors['username']?.message}</Form.Text>
                    </FloatingLabel>
                    <div>
                        <Button className={styles['register-button']} variant="primary" type="submit">
                            Register
                        </Button>
                    </div>
                    <Form.Text className="text-muted">
                        Already have an account? <span className={styles['underline-pointer']} onClick={navigateLogin}>Login</span>.
                    </Form.Text>


                </Form>
            </div>
        </div>
    );
};

export default Register;
