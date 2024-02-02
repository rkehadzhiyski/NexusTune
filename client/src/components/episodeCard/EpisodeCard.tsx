import Card from 'react-bootstrap/Card';

import styles from './episodeCard.module.css';
import { formatDate } from '../../utils/formatDate'
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/episode/${episode._id}`);
    };
    return (
        <Card className={styles['card-container']} onClick={handleClick}>
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