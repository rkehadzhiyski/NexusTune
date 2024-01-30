import Card from 'react-bootstrap/Card';

import styles from './podcastCard.module.css';

interface Podcast {
  name: string;
  description: string;
  image: string;
}

interface PodcastCardProps {
  podcast: Podcast;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <Card className={styles['card-container']}>
      <Card.Img className={styles['card-image']} variant="top" src={podcast.image} />
      <Card.Body>
        <Card.Title>{podcast.name}</Card.Title>
        <Card.Text>
          {podcast.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PodcastCard;