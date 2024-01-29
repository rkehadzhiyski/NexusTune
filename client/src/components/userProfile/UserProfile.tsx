import { useContext, useState } from 'react';
import AuthContext from '../../contexts/authContext';

import styles from './userProfile.module.css';
import UserPodcasts from '../userPodcasts/UserPodcasts';
import Button from 'react-bootstrap/Button';
import EditProfile from '../editProfile/EditProfile';

const UserProfile = () => {
    const [modalShow, setModalShow] = useState(false);
    const {
        user
    } = useContext(AuthContext);

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
                    <Button onClick={() => setModalShow(true)} variant="primary" >
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
                id={user.userId}
            />
        </div>
    );
}

export default UserProfile;