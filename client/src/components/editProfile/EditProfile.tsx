import { ChangeEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as userService from '../../services/userService';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { uploadFile } from '../../services/storageService';

interface Props {
    onHide: () => void,
    show: boolean,
    user: {
        userId: string;
        description: string;
    }
}

interface FormData {
    description: string;
    profileImage: unknown;
}

interface EditUserData {
    image: string;
    description: string;
}

const supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];

const isFileList = (value: object): value is FileList => value && value instanceof FileList;

const schema = yup.object().shape({
    profileImage: yup.mixed().required('Image is required')
        .test('type', 'Unsupported file format', function (value) {
            if (!value) {
                return false;
            }

            const file = isFileList(value) ? value[0] : value;

            return file && supportedImageFormats.includes((file as File).type);
        }),
    description: yup.string().required('Description is required'),
});

const EditProfile: React.FC<Props> = (props) => {
    const [podcastImage, setPodcastImage] = useState<File>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (props) {
            setValue('description', props.user.description);
        }
    }, [props, setValue]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        const response = await uploadFile(props.user.userId, podcastImage);
        if (response && response.url) {
            const podcastData: EditUserData = {                
                image: response.url,
                description: data.description,
            };
            userService.editUser(podcastData);
            props.onHide();
        } else {
            console.error("Upload failed!");
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPodcastImage(event.target.files[0]);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label >Podcast image</Form.Label>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                            type="file"
                            {...register('profileImage')}
                            onChange={handleFileChange}
                            multiple={false}
                            placeholder="Profile Image" />
                        <Form.Text className="text-danger">{errors['profileImage']?.message}</Form.Text>
                    </Form.Group>
                    <FloatingLabel className='mb-3' label="Description" controlId="formGroupDescription">
                        <Form.Control
                            style={{ height: '100px' }}
                            as={'textarea'}
                            type="text"
                            {...register('description')}
                            placeholder="Description"
                            autoComplete="description"
                        />
                        <Form.Text className="text-danger">{errors['description']?.message}</Form.Text>
                    </FloatingLabel>
                    <Button variant="primary" type="submit">Edit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProfile;