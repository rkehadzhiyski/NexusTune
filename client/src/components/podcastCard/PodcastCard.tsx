import Card from 'react-bootstrap/Card';

import styles from './podcastCard.module.css';
import { useNavigate } from 'react-router-dom';

import { truncateText } from '../../utils/trancateText';

interface Podcast {
  _id: number;
  name: string;
  description: string;
  image: string;
}

interface PodcastCardProps {
  podcast: Podcast;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  const navigate = useNavigate();

  const description = truncateText(podcast.description);

  const handleClick = () => {
    navigate(`/podcast/${podcast._id}`);
  };

  return (
    <Card className={styles['card-container']} onClick={handleClick}>
      <Card.Img className={styles['card-image']} variant="top" src={podcast.image} />
      <Card.Body>
        <Card.Title>{podcast.name}</Card.Title>
        <Card.Text className={styles['podcast-description']}>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PodcastCard;