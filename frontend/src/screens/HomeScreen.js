import { ListGroup, Button } from 'react-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/message";
import MyCard from "../components/MyCard";
import { useGetBooksQuery } from "../slices/bookApiSlice";
import { useNavigate } from 'react-router-dom';
const HomeScreen = () => {
    const navigate = useNavigate();
    const {data: books, isLoading, error} = useGetBooksQuery();
    console.log('books ',books);
    const addBookHandler = () => {
        localStorage.clear();
        navigate('/addbook');
    }
    return (
        <>
            {isLoading ? ( 
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            )  : (
                <>  
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ flex: 1 }}>Books</h1>
                        <Button type='button' variant='primary' onClick={() => addBookHandler()}>
                            Add Book
                        </Button>
                    </div>
                    {books.length === 0 ? (
                        <Message>
                            No Books Available
                        </Message>) : (
                        <ListGroup variant='flush'>
                            {books.map((book) => (
                                <MyCard key={book._id} book={book}></MyCard>
                            ))}
                        </ListGroup>
                    )} 
                </>
            )}
        </>
    )
}

export default HomeScreen;