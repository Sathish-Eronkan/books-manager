import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Rating from "./Rating";
const MyCard = ({book}) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Body>
                <Link to={`/book/${book._id}`}>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text as='div'>
                    <Rating value={book.rating} />
                    </Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default MyCard;