import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

import styles from './userProfile.module.css';
import UserPodcasts from '../userPodcasts/UserPodcasts';

const UserProfile = () => {
    const {
        user
    } = useContext(AuthContext);
    
    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-info-container']}>
                <img className={styles['profile-picture']} src='\user-image-default.webp' alt='profile-image'/>
                <p className={styles['username']}>{user.username}</p>
                <div className={styles['profile-description']}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit sint alias perferendis quis
                        totam maxime hic voluptates
                        sunt dolorum dolore?
                    </p>
                </div>
            </div>
            <UserPodcasts userId={user.userId}/>
        </div>
    );
}

export default UserProfile;