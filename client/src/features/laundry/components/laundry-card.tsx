import { Card } from 'react-bootstrap';
import LaundryDisplay from '../assets/ts/laundry';
const LaundryCard = ({image,name,address}:LaundryDisplay) => {
  return (
    <Card
      className="laundry-card"
    >
      <Card.Img variant="top" src={image} className="laundry-card-image" />
      <Card.Body className='laundry-card-text'>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{address}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LaundryCard;
