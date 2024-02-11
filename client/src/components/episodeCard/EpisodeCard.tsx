import { useNavigate } from 'react-router-dom';

import styles from './episodeCard.module.css';
import { formatDate } from '../../utils/formatDate'
import { formatDuration } from '../../utils/formatDuration';

import Image from 'react-bootstrap/Image';

interface Episode {
    _id: number;
    name: string;
    description: string;
    image: string;
    audio: string;
    createdAt: string;
    duration: number;
}

interface PodcastCardProps {
    episode: Episode;
    podcast?: string;
}

const EpisodeCard: React.FC<PodcastCardProps> = ({ podcast, episode }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (podcast) {
            navigate(`/episode/${podcast}/${episode._id}`);
        }
    };
    return (
        // <Card className={styles['card-container']} onClick={handleClick}>
        //     <Card.Header>{episode.name}</Card.Header>
        //     <Card.Body>
        //         <Card.Img className={styles['card-image']} variant="top" src={episode.image} />
        //         <Card.Text>{episode.description}</Card.Text>
        //     </Card.Body>
        //     <Card.Footer className="text-muted">{formatDuration(episode.duration)} | {formatDate(episode.createdAt)}</Card.Footer>
        // </Card>

        <div className={styles['episode-card-container']} >
            <div className={styles['card-inner-container']} onClick={handleClick}>
                <Image className={styles['episode-image']} src={episode.image} rounded />
                <div className={styles['card-info-container']}>
                    <div>
                        <h3>{episode.name}</h3>
                    </div>
                    <div className={styles['episode-description']}>
                        <p>{episode.description}</p>
                    </div>
                    <div className={styles['episode-more-info']}>
                        <p>{formatDuration(episode.duration)} | {formatDate(episode.createdAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EpisodeCard;