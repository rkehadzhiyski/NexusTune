import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { create } from '../../services/podcastService';

import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface FormData {
    name: string;
    audioFile: string;
    image: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    audioFile: yup.string().required('File is required'),
    image: yup.string().required('Picture is required'),
});

const Upload = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        create(data);
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FloatingLabel label="Name" className="mb-3" controlId="formGroupName">
                    <Form.Control
                        type="name"
                        {...register('name')}
                        placeholder="Enter a name"
                        autoComplete="name-input"
                    />
                    <Form.Text className="text-danger">{errors['name']?.message}</Form.Text>
                </FloatingLabel>
                <FloatingLabel label="Image" className="mb-3" controlId="formGroupImage">
                    <Form.Control
                        type="text"
                        {...register('image')}
                        placeholder="Image"
                        autoComplete="current-image"
                    />
                    <Form.Text className="text-danger">{errors['image']?.message}</Form.Text>
                </FloatingLabel>
                <Form.Text className="text-muted">
                </Form.Text>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                        type="file"
                        {...register('audioFile')}
                        placeholder="Submit File" />
                </Form.Group>
                <div>
                    <Button variant="primary" type="submit">
                        Upload
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default Upload;