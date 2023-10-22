
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import MyFilms from '../navigation-bar/IndieFilms all of the films worth watching.svg';


export const NavigationBar = ({ user, onLoggedOut }) => {

  

  return (
    <Navbar  collapseOnSelect expand="lg"className="bg-body-tertiary" >
       <Container>
         <Navbar.Brand href="/">
            <img
              alt="MyFilms logo"
              src={MyFilms}
              width=""
              height="100"
              className="d-inline-block align-top"
            />{' '}
         </Navbar.Brand>
     
         
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
         
            {!user && (
                <>
                 <Nav.Link as={Link} to='/login'>
                    Login
                    </Nav.Link>
                 <Nav.Link as={Link} to='/signup'>
                    Signup
                 </Nav.Link>
                </>
            )}
            {user && (
                <>
                  <Nav.Link as={Link} to= '/'>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to='/profile'>
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                </>
            )}

          </Nav>
        </Navbar.Collapse>

   
        </Container>
      </Navbar>
    
   
  );
}


