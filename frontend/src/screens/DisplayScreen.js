import { ListGroup } from 'react-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/message";
import ShowCard from "../components/ShowCard";
import { Button } from 'react-bootstrap';
import { useGetBookDetailsQuery } from "../slices/bookApiSlice";
import { useParams, useNavigate } from 'react-router-dom';
const DisplayScreen = () => {
    const navigate = useNavigate();
    let {id: bookId} = useParams();
    console.log('book id ',bookId);
    const {data: book, isLoading, error} = useGetBookDetailsQuery(bookId);
    console.log('book details ',book);
    return (
        <>
            {isLoading ? ( 
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            )  : (
                <>  <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ flex: 1 }}>Details</h1>
                        <Button type='button' variant='primary' onClick={() => navigate('/')}>
                            Back
                        </Button>
                    </div>
                    <ListGroup variant='flush'>
                        <ShowCard key={book._id} book={book}></ShowCard>                       
                    </ListGroup>
                </>
            )}
        </>
    )
}

export default DisplayScreen;