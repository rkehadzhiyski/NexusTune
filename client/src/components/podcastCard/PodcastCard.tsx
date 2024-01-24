import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function PodcastCard(podcast:object) {
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