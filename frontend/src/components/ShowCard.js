import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation } from '../slices/bookApiSlice';
import Loader from "./Loader";
import Message from "./message";
const ShowCard = ({book}) => {
    const navigate = useNavigate();
    localStorage.setItem('bookInfo', JSON.stringify(book));
    console.log('book from show card ',book);
    const [deleteBook, { isLoading, error }] = useDeleteBookMutation(); 
    const deleteHandler = async (bookId) => {
        const deleteStatus = await deleteBook(bookId);
        console.log('deleteStatus ',deleteStatus);
        if(deleteStatus)
        navigate('/');
    }
    return (
        <>
        {isLoading ? ( 
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error?.error}
                </Message>
            )  : (
            <Card className="my-3 p-3 rounded">
                <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text>
                        <strong>Written By:</strong> {book.author}
                    </Card.Text>
                    <Card.Text>
                        <strong>Genre:</strong> {book.genre}
                    </Card.Text>
                    <Card.Text>
                        <strong>Rating:</strong> {book.rating}
                    </Card.Text>
                    <Card.Text>
                        <strong>Description:</strong> {book.description}
                    </Card.Text>
                    <div className="my-2">
                        <Button type='button' variant='primary' style={{ marginRight: '10px' }} onClick={() => navigate('/addbook')}>
                        Update
                        </Button>
                        <Button type='button' variant='primary' onClick={() => deleteHandler(book._id)}>
                        Delete
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        )}
        </>
    )
}

export default ShowCard;