import React from 'react';
import { Row, Col, Button, Figure } from 'react-bootstrap';
import '../profile-view.scss'


export const AddFavorite = ({favoriteMovies}) => {

return (
  <Card>
    <Card.Body>
   <Row>
     <Col xs={12} className='text-center'>
    <h4>Favorite Movies</h4>
    </Col>
    </Row>
    <Row>
    {favoriteMovies.map((movies) => {
        return (
            <Col xs={12} md={6} lg={3} key = {movies._id} className='fav-movie'>
                <Figure>
                <Link to={`/movies/${movies._id}`}>
                    <Figure.Image src={movies.ImagePath}
                     />
                        <Figure.Caption>
                        {movies.Title}
                        </Figure.Caption>
                        </Link>
                </Figure>
                    <addFavoriteMovie />
                <Button variant='secondary' onClick={()=> removeFav(movies._id)}>Remove from list</Button>
             </Col>
        )
    })
}
  </Row>
  </Card.Body>
  </Card>
    )
}

    
