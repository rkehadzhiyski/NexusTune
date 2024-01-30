import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as userService from '../../services/userService';
import styles from './editProfile.module.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { uploadFile } from '../../services/storageService';

interface Props {
    onHide: () => void,
    fetchData: () => void,
    show: boolean,
    user: {
        _id: string;
        username: string;
        description: string | undefined;
        image: string | undefined;
    }
}

interface FormData {
    description?: string;
    image?: string;
}

interface UserUpdate {
    image?: string;
    description?: string;
}

const supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];

const isFileList = (value: object): value is FileList => value && value instanceof FileList;

const schema = yup.object().shape({
    profileImage: yup.mixed()
        .test('type', 'Unsupported file format', function (value) {
            if (Array.isArray(value) && value.length > 0) {
                const file = isFileList(value) ? value[0] : value;

                return file && supportedImageFormats.includes((file as File).type);
            }
            return true;
        }),
    description: yup.string(),
});

const EditProfile: React.FC<Props> = (props) => {
    const [userImage, setUserImage] = useState<string>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (props.user.description) {
            setValue('description', props.user.description);
        }

    }, [props, setValue]);

    const onSubmit = async (data: FormData) => {
        const description = props.user.description;

        const userData: UserUpdate = {
            image: userImage,
            description: description,
        };

        if (data.description) {
            userData.description = data.description;
        }

        userService.editUser(props.user._id, userData);
        props.fetchData();
        props.onHide();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            
            try {
                const response = await uploadFile(props.user._id, event.target.files[0]);                
                if (response && response.url) {
                    setUserImage(response.url);
                } else {
                    console.error("Upload failed!");
                }
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            {userImage &&
            <div className={styles['image-container']}>
                <img className={styles['image']} src={userImage} alt="profile-photo-preview" />
            </div>
            }
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label >Podcast image</Form.Label>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                            type="file"
                            {...register('profileImage')}
                            onInput={handleFileChange}
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