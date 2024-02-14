import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; 2024 Nexus Tunes. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;