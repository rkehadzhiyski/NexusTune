import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

import styles from './userProfile.module.css';
import UserPodcasts from '../userPodcasts/UserPodcasts';
import Button from 'react-bootstrap/Button';

const UserProfile = () => {
    const {
        user
    } = useContext(AuthContext);
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate('/edit-profile')
    }

    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-info-container']}>
                <img className={styles['profile-picture']} src='\user-image-default.webp' alt='profile-image' />
                <p className={styles['username']}>{user.username}</p>
                <div className={styles['profile-description']}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit sint alias perferendis quis
                        totam maxime hic voluptates
                        sunt dolorum dolore?
                    </p>
                    <Button onClick={navigateTo} variant="primary" >
                        Edit Profile
                    </Button>
                </div>
            </div>
            <div className={styles['user-podcasts']}>
                <h2 className={styles['podcasts-heading']}>My Podcasts</h2>
                <UserPodcasts userId={user.userId} />
            </div>
        </div>
    );
}

export default UserProfile;