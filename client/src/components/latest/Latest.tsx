import styles from './latest.module.css';

import Image from 'react-bootstrap/Image';
import { formatDate } from "../../utils/formatDate";
import { truncateText } from "../../utils/trancateText";

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
    const firstPodcast = latestPodcasts.shift();

    return (
        <div className={styles['latest-container']}>
            <h2>Latest Podcasts</h2>
            <section className={styles['top-section']}>
                <Image className={styles['podcast-image']} src={firstPodcast?.image} rounded />
                <div className={styles['podcast-info']}>
                    <div>
                        <h3>{firstPodcast?.name}</h3>
                    </div>
                    <div className={styles['podcast-description']}>
                        <p>{firstPodcast?.description}</p>
                    </div>
                    <div className={styles['podcast-more-info']}>
                        <p>{formatDate(firstPodcast!.createdAt)}</p>
                    </div>
                </div>
            </section>
            <section className={styles['bottom-section']}>
                {latestPodcasts.map(podcast => (
                    <div key={podcast._id} className={styles['additional-podcast-container']}>
                        <Image className={styles['additional-podcast-image']} src={podcast.image} />
                        <div className={styles['info-section']}>
                            <div>
                                <h4>{podcast.name}</h4>
                            </div>
                            <div className={styles['additional-podcast-description']}>
                                <p>{truncateText(podcast.description, 160)}</p>
                            </div>
                            <div className={styles['additional-podcast-more-info']}>
                                <p>{formatDate(podcast.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Latest;