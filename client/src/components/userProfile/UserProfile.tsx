import { useCallback, useContext, useEffect, useState } from 'react';
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

    const fetchData = useCallback(async () => {
        try {
            const response = await userService.getOne(user.userId);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching podcast:", error);
        }
    }, [user.userId]);

    useEffect(() => {
        fetchData();
    }, [user.userId, fetchData]);

    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-info-container']}>
                <img className={styles['profile-picture']} src={userData?.image ?? '/user-image-default.webp'} alt='profile-image' />
                <p className={styles['username']}>{user.username}</p>
                <div className={styles['profile-description']}>
                    <p>{userData?.description}</p>
                    <Button className={styles['edit-button']} onClick={() => setModalShow(true)} variant="primary" >
                        Edit Profile
                    </Button>
                </div>
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