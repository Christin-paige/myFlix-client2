import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from'react';
import { Modal } from 'react-bootstrap';


export const MovieCard = ({movie, token, setUser, user }) => {
    const [addFavorite, setAddFavorite] = useState(false);

    useEffect(() => {
        if (user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
            setAddFavorite(true);
        }
    },[user]);

    const addFavoriteMovie = () => {
//Posting user's favorite movies
        fetch(`https://myfilms-2457a2cd41b6.herokuapp.com/users/${user.Name}/movies/${movie.id}`,{
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }) 
    .then((response)=> {
        if (response.ok) {
            return response.json()
        }else{
            console.log('could not add movie');
        }
        })
    .then((responseUser) => {
        if(responseUser) {
            localStorage.setItem('user', JSON.stringify(responseUser));
            setUser(responseUser);
            setAddFavorite(true);
            console.log('Added to favorites');
        }
        })
       .catch((err) => {
        console.log(`favorite movies error: ${err}`)
       })
         
    };
  

    const removeFavoriteMovie = () => {
        console.log('called removeFavoriteMovie')
        fetch(`https://myfilms-2457a2cd41b6.herokuapp.com/users/${user.Name}/movies/${movie.id}`,{
            method: 'DELETE',
            headers: {
              //'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
           
    })
    .then((response) => {
        if (response.ok) {
            console.log('Successfully removed from favorites');
            setAddFavorite(false);
            response.json().then((updatedUser) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }).catch((jsonError) => {
            console.log('Error parsing JSON response: ', jsonError);
        });
        }else{
            console.log('Could not remove movie.  Server response: ', response);
        }
        })
        .catch((error) => {
           console.log(error, "could not delete")
        });
 
    }

    return (
            <Card className='h-100'>
              <Card.Img variant='top' src={movie.image} />
        <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>

                <Button variant='link'>Open</Button> 
            </Link>
            
           {!addFavorite ? (
             <Button variant='primary' onClick={addFavoriteMovie}>
                    Add Fav
                    </Button>             
           ) : (
            <Button variant='warning' onClick={removeFavoriteMovie}>
                Remove Fav
            </Button>
           )}
          
        </Card.Body>
        </Card>
       
        );
     };

            
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired

}