import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';



import './movie-view.scss';


export const MovieView = ({ movies }) => {
    console.log('yessss', movies)
   
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
   

  return (
    <Card border='primary' class="card-img-top d-flex align-items-center" style={{ width: '30rem' }}>  
            
               
            <Card.Img variant='top' src={movie.image} />
          
       <Card.Body>
           
            <Card.Title className='text-center'>{movie.title}</Card.Title>
       
            <Card.Subtitle>Director: </Card.Subtitle>
            <Card.Text>{movie.director.name || 'N/A'}</Card.Text>
           
        
            <Card.Subtitle>Genre: </Card.Subtitle>
            <Card.Text>{movie.genre.name || 'N/A'}</Card.Text>
       
            <Card.Subtitle> Description: </Card.Subtitle>
            <Card.Text>{movie.description|| 'N/A'}</Card.Text>

        <Link to={`/`}>
            <Button variant='primary'>Back</Button>
        </Link>
     </Card.Body>

    
     </Card>

    );
   
};