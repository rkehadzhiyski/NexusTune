import Card from 'react-bootstrap/Card';

import styles from './episodeCard.module.css';
import { formatDate } from '../../utils/formatDate'

interface Episode {
    _id: number;
    name: string;
    description: string;
    image: string;
    audio: string;
    createdAt: string;
}

interface PodcastCardProps {
    episode: Episode;
}

const EpisodeCard: React.FC<PodcastCardProps> = ({ episode }) => {
    return (
        <Card className={styles['card-container']} >
            <Card.Header>{episode.name}</Card.Header>
            <Card.Body>
                <Card.Img className={styles['card-image']} variant="top" src={episode.image} />
                <Card.Text>{episode.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{formatDate(episode.createdAt)}</Card.Footer>
        </Card>
    );
}

export default EpisodeCard;