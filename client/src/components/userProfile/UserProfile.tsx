import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/authContext';

import * as userService from '../../services/userService';

import styles from './userProfile.module.css';
import UserPodcasts from '../userPodcasts/UserPodcasts';
import Button from 'react-bootstrap/Button';
import EditProfile from '../editProfile/EditProfile';

interface User {
    _id: string;
    username: string;
    description: string;
    image: string
}

const UserProfile = () => {
    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useState<User>({
        _id: '',
        username: '',
        description: '',
        image: '',
    });
    const {
        user,
    } = useContext(AuthContext);

    const fetchData = async () => {
        try {
            const response = await userService.getOne(user.userId);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching podcast:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.getOne(user.userId);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching podcast:", error);
            }
        };
        fetchData();
    }, [user.userId]);

    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-info-container']}>
                <img className={styles['profile-picture']} src={userData?.image ?? '/user-image-default.webp'} alt='profile-image' />
                <h4 className={styles['username']}>{user.username}</h4>
                <div className={styles['profile-description']}>
                    <p>{userData?.description}</p>
                </div>
                <Button className={styles['edit-button']} onClick={() => setModalShow(true)} style={{ backgroundColor: '#5065a8' }}>
                    Edit Profile
                </Button>
            </div>
            <div className={styles['user-podcasts']}>
                <h2 className={styles['podcasts-heading']}>My Podcasts</h2>
                <UserPodcasts userId={user.userId} />
            </div>
            <EditProfile
                show={modalShow}
                onHide={() => setModalShow(false)}
                fetchData={() => fetchData()}
                user={userData}
            />
        </div>
    );
}

export default UserProfile;