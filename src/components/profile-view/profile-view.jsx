import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { AddFavorite} from './favorite-movies/favorite-movies'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Container, CardGroup, Form, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../profile-view/profile-view.scss'


export const ProfileView = ({ user, token, setUser, movies}) => {
    const [username, setUsername] = useState(user.Name);
    const [password, setPassword] = useState('*****');
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [favoriteMovies, setFavoriteMovies] = useState(['']);
  
   
  //creates an array with movies
  //movies has all the movies

  let result = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie.id);
    }
  );
console.log(movies, 'here are the movies')
  

     const handleUpdate = (event) => {

     event.preventDefault();
     
     const data = {
        Name: username,
        Email: email,
        Password: password,
        Birthday: birthday,
        FavoriteMovies: favoriteMovies
    };

        fetch(`https://myfilms-2457a2cd41b6.herokuapp.com/users/${user.Name}`, {
            method: 'PUT',
            headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(data),
        })
          .then((response) => {
            console.log(response, 'response')
            if (response.ok) {
              return response.json();
            }else{
              throw new Error('update failed');
            }
          })
             
            .then((updatedUser) => {
              console.log(updatedUser, 'updated user test');
              //update component with new user data
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert('Update successful');
            })
            .catch((err) => console.log('error', err));
         console.log(data, 'daaaaata')   
     };
       
      

       const deleteAccount = () => {

        fetch(`https://myfilms-2457a2cd41b6.herokuapp.com/users/${user.Name}`, {
            method: 'DELETE',
            headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`

            },
            body: JSON.stringify(data),
        })
          .then((response) => {
            console.log(response, 'response')
            if (response.ok) {
              setUser(null);
              localStorage.clear();
              alert('your account has been deleted')
            }else{
              alert('Could not delete account')
            }
          })
      };
      
  console.log(result,'see results');
  console.log(user.Name, 'user.Name');
  console.log(favoriteMovies);
  console.log(user.Password, 'password');
  console.log(movies);
  
 

    return (
    <Container className='container'>
     <Row>
      <Col  xs={12} sm={8}  style={{width: '500px'}}>
            <Card className='mt-2'style={{width: '500px'}}>
            <Card.Body>
              <Card.Title className='font-link'>My Profile</Card.Title>
                <Card.Text>Name: {user.Name}</Card.Text>
                <Card.Text>Email: {user.Email}</Card.Text>
                </Card.Body>
            </Card>
       </Col>
              
               
         <Col xs={12} sm={8} style={{width: '500px'}}>
              <Form>
                <Card className='mt-2' style={{width: '500px'}}>
                  <Card.Body>
                    <Card.Title className='font-link'>Want to Change Some Info?</Card.Title>
                 <Form onSubmit={handleUpdate}>
                  <Form.Group>
                    <Form.Label>New Username:
                      <Form.Control
                        style={{ width: '400px'}}
                        type= 'text'
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        placeholder={user.Name}                       
                      />
                    </Form.Label>
                  </Form.Group>
        
                  <Form.Group  controlId='UpdatePassword'>
                   <Form.Label>New Password:
                      <Form.Control 
                      style={{ width: '400px'}}
                      type= 'password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='*****'
                       />
                   </Form.Label>
                  </Form.Group>

                  <Form.Group className='mb-5' controlId='UpdateEmail'>
                   <Form.Label>New Email:
                     <Form.Control
                      style={{ width: '400px'}}
                      type= 'email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                   </Form.Label>
                  </Form.Group>
             
              <Button 
                 variant='primary' 
                 size='sm'
                 type='submit' 
                 onClick={handleUpdate}
                 className='text-white'
                 
                 >
                      Update
              </Button> 
            
              </Form>
           <Link to='/login'>

              <Button 
                variant='danger'
                size = 'sm'
                onClick={deleteAccount}
                className='text-white' 
                >
                  Delete Account
              </Button>
            </Link> 
               
                   </Card.Body>
                 </Card>
               </Form>
          </Col>
        </Row>


        <Col className='font-link ms-auto' style={{width:'100%'}}>
           <h4>Favorite Movies</h4>
        </Col>
      
        <CardGroup>
       
        
         {result.map((movie) => (
            <Col xs={12} md={9} lg={4} className='m-2' key={movie.id} >
             
             <MovieCard
                movie = {movie}
                token={token}
                setUser={setUser}
                favoriteComponent={AddFavorite}
                user = {user}
                >
             </MovieCard>

          </Col>
         ))}
          
        </CardGroup>
      
       
 </Container>
    )}
