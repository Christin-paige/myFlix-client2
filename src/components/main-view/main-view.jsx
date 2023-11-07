import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { Row, Col } from 'react-bootstrap';
import { SearchBar } from '../search-bar/search-bar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './main-view.scss';


export const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');
   const [user, setUser] = useState(storedUser? storedUser : null);
   const [token, setToken] = useState(storedToken? storedToken : null);
   const [movies, setMovies] = useState ([]);
   const [selectedMovie, setSelectedMovie] = useState('movie');
   
  
   const handleSearch = (searchInput) => {
    const results = movies.filter((movie) => 
     movie.title.toLowerCase().includes(searchInput.toLowerCase())
 );
 setMovies(results);
   };
  

    useEffect(() => {
        if (!token) {
            return;
        }
      fetch('https://myfilms-2457a2cd41b6.herokuapp.com/movies', {
         headers: { Authorization: `Bearer ${token}` },
   })
       
        .then((response) => response.json())
        .then((data) => {
          
           const moviesFromApi = data.map((movie) => {
            console.log(movie)
         
              
                return {
                    id: movie._id,
                    title: movie.Title || 'N/A',
                    description: movie.Description || 'N/A',
                    director: {
                      name: movie.Director.Name || 'N/A',
                      bio: movie.Director.Bio || 'N/A',
                      birthday: movie.Director.Birth || 'N/A',
                    },
                   
                    genre: {
                      name: movie.Genre.Name || 'N/A',
                      description: movie.Genre.Description || 'N/A',
                    },
                    image: `${movie.ImagePath}` || 'N/A',
                };
            });
          
          console.log(data)
            setMovies(moviesFromApi);
            console.log('Selected Movie:', selectedMovie);
           
        });
      
 }, [token]);

    return (
     
      <BrowserRouter>
       <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
     
       <Row className ='justify-content-md-center'>
       <Routes>
        <Route
          path='/signup'
            element={
              <>
            {user ? (
              <Navigate to='/' />
            ) : (
                <Col md={5}>
                 <SignupView />
                </Col> 
            )} 
         </>
        }
      />
        <Route
          path='/login'
          element={
            <>
            {user ? (
              <Navigate to='/' />
            ) : (
              <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                 }} />
              </Col>
              )}
            </>
          }
          />
         <Route
          path='/users'
          element={
            <>
            {user ? (
              <Navigate to='/users' />
            ) : (
              <Col md={5}>
                <ProfileView />
              </Col>
              )}
            </>
          }
          />
           <Route
             path='/movies/:movieId'
             element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                 <Col md={5}>
                   <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
         
          <Route 
            path='/profile'
            element={
              <>
              {!user ? (
                <Navigate to='/login' />
              ) : (
                <Col md={5}>
                  <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      setUser={setUser}
                  />  
                  
                </Col>
             )}
           </>
          }         
        />  
        <Route
          path='/'
          element={
            <>
              {!user ? (
               <Navigate to='/login' replace />
              ) : movies.length === 0 ? (
                <Col>List is empty!</Col>
              ) : (
                <>
                
               
                  <SearchBar onSearch={handleSearch} />
                <Container>
            {movies.map((movie) => (
             
                <MovieCard key={movie.id} user={user} movie={movie} token={token} setUser={setUser} />
               
              ))} 
               </Container>
            </>
          )} 
          </>
          }
          />
         </Routes>
       </Row>
      </BrowserRouter>
    );
};










    

 


           

       
    
  

 
      

    
        
           