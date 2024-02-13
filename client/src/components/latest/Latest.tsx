import styles from './latest.module.css';

import Image from 'react-bootstrap/Image';
import { formatDate } from "../../utils/formatDate";
import { truncateText } from "../../utils/trancateText";
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../utils/formatDuration';

interface Podcast {
    _id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    duration?: number | undefined;
    podcastId?: number | undefined;
    podcastName?: string | undefined;
}

interface PodcastCardProps {
    type: string;
    latest: Podcast[];
}

const Latest: React.FC<PodcastCardProps> = ({ type, latest }) => {
    const navigate = useNavigate();

    const navigateToPodcast = (id: number) => {
        navigate(`/podcast/${id}`);
    }

    const navigateToEpisode = (podcastName: string, episodeId: number) => {
        navigate(`/episode/${podcastName}/${episodeId}`);
    }

    return (
        <section className={styles['top-section']}>
            {type == 'podcast' &&
                <>
                    <h1>Latest Podcasts</h1>
                    <section className={styles['latest-container']} onClick={() => navigateToPodcast(latest[0]._id)}>
                        <Image className={styles['podcast-image']} src={latest[0].image} rounded />
                        <div className={styles['podcast-info']}>
                            <div>
                                <h3>{latest[0].name}</h3>
                            </div>
                            <div className={styles['podcast-description']}>
                                <p>{latest[0].description}</p>
                            </div>
                            <div className={styles['podcast-more-info']}>
                                <p>{formatDate(latest[0].createdAt)}</p>
                            </div>
                        </div>
                    </section>
                </>
            }

            {type == 'episode' &&
                <>
                    <h1>Latest Episodes</h1>
                    <section className={styles['latest-container-episodes']} onClick={() => navigateToEpisode(latest[0].podcastName!, latest[0]._id)}>
                        <div className={styles['podcast-info']}>
                            <div>
                                <h3>{latest[0].name}</h3>
                            </div>
                            <div className={styles['podcast-description']}>
                                <p>{latest[0].description}</p>
                            </div>
                            <div className={styles['podcast-more-info']}>
                                <p>{latest[0].duration !== undefined ? formatDuration(latest[0].duration) : ''} | {formatDate(latest[0].createdAt)}</p>
                            </div>
                        </div>
                        <Image className={styles['podcast-image']} src={latest[0].image} rounded />
                    </section>
                </>
            }

            <section className={styles['bottom-section']}>
                {latest.slice(1).map(podcast => (
                    <div key={podcast._id} className={styles['additional-podcast-container']} onClick={type === 'podcast' ? () => navigateToPodcast(podcast._id) : () => navigateToEpisode(podcast.podcastName!, podcast._id)}>
                        <Image className={styles['additional-podcast-image']} src={podcast.image} />
                        <div className={styles['info-section']}>
                            <div>
                                <h4>{truncateText(podcast.name, 25)}</h4>
                            </div>
                            <div className={styles['additional-podcast-description']}>
                                <p>{truncateText(podcast.description, 145)}</p>
                            </div>
                            <div className={styles['additional-podcast-more-info']}>
                                <p>{podcast.duration !== undefined ? `${formatDuration(podcast.duration)} |` : ''}  {formatDate(podcast.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </section >
    );
}

export default Latest;