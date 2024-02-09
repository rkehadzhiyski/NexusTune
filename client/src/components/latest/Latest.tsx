import styles from './latest.module.css';

import Image from 'react-bootstrap/Image';
import { formatDate } from "../../utils/formatDate";
import { truncateText } from "../../utils/trancateText";
import { useNavigate } from 'react-router-dom';

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
}

interface PodcastCardProps {
    latestPodcasts: Podcast[];
}

const Latest: React.FC<PodcastCardProps> = ({ latestPodcasts }) => {
    const navigate = useNavigate();

    const navigateTo = (podcasdtId: number) => {
        navigate(`/podcast/${podcasdtId}`)
    }
    return (
        <section className={styles['top-section']}>
            <h1>Latest Podcasts</h1>
            <section className={styles['latest-container']} onClick={() => navigateTo(latestPodcasts[0]._id)}>
                <Image className={styles['podcast-image']} src={latestPodcasts[0].image} rounded />
                <div className={styles['podcast-info']}>
                    <div>
                        <h3>{latestPodcasts[0].name}</h3>
                    </div>
                    <div className={styles['podcast-description']}>
                        <p>{latestPodcasts[0].description}</p>
                    </div>
                    <div className={styles['podcast-more-info']}>
                        <p>{formatDate(latestPodcasts[0].createdAt)}</p>
                    </div>
                </div>
            </section>
            <section className={styles['bottom-section']}>
                {latestPodcasts.slice(1).map(podcast => (
                    <div key={podcast._id} className={styles['additional-podcast-container']} onClick={() => { navigateTo(podcast._id) }}>
                        <Image className={styles['additional-podcast-image']} src={podcast.image} />
                        <div className={styles['info-section']}>
                            <div>
                                <h4>{podcast.name}</h4>
                            </div>
                            <div className={styles['additional-podcast-description']}>
                                <p>{truncateText(podcast.description, 145)}</p>
                            </div>
                            <div className={styles['additional-podcast-more-info']}>
                                <p>{formatDate(podcast.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section>
    );
}

export default Latest;