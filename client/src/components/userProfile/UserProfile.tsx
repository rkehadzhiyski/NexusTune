import styles from './userProfile.module.css';

const UserProfile = () => {
    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-info-container']}>
                <img className={styles['profile-picture']} src='/profile-image.jpg' alt='profile-image' />
                <p className={styles['username']}>Username</p>
                <div className={styles['profile-description']}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit sint alias perferendis quis
                        totam maxime hic voluptates
                        sunt dolorum dolore?
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;