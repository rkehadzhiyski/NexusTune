import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={podcast.image} />
      <Card.Body>
        <Card.Title>{podcast.name}</Card.Title>
        <Card.Text>
          {podcast.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default PodcastCard;