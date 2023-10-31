import { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/message';
import { useAddBookMutation, useEditBookMutation } from '../slices/bookApiSlice';
import { useNavigate } from 'react-router-dom'
const CreateScreen = () => {
  const initialState = localStorage.getItem('bookInfo') ? JSON.parse(localStorage.getItem('bookInfo')) : null;
  const navigate = useNavigate();
  const initialName = initialState ? initialState.name : '';
  const initialAuthor = initialState ? initialState.author : '';
  const initialRating = initialState ? initialState.rating : 0;
  const initialGenre = initialState ? initialState.genre : '';
  const initialDescription = initialState ? initialState.description : '';
  const [name, setName] = useState(initialName)
  const [author, setAuthor] = useState(initialAuthor)
  const [rating, setRating] = useState(initialRating)
  const [genre, setGenre] = useState(initialGenre)
  const [description, setDescription] = useState(initialDescription)
  const [addBook] = useAddBookMutation();
  const [updatedBook] = useEditBookMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if(initialState) {
        const res = await updatedBook({ 
          _id: initialState._id,
          name, 
          author, 
          rating, 
          genre, 
          description 
        }).unwrap();
        console.log('updated');
      } else {
        const res = await addBook({ name, author, rating, genre, description }).unwrap();
        console.log('submitted');
      }
      
      localStorage.clear();
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  function cancelHandler() {
    localStorage.clear();
    navigate('..');
  }

  return (
    <FormContainer>
        <h1>Add Book</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter Author'
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='genre'>
            <Form.Label>Genre</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter Genre'
                value={genre}
                required
                onChange={(e) => setGenre(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='rating'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter Rating'
                value={rating}
                required
                onChange={(e) => setRating(e.target.value)}
            ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <div className="my-2">
              <Button type='button' variant='primary' style={{ marginRight: '10px' }} onClick={cancelHandler}>
                Cancel
              </Button>
              <Button type='submit' variant='primary'>
                Save
              </Button>
            </div>
        </Form>
    </FormContainer>
  ) 
};

export default CreateScreen;
