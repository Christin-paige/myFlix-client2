import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');

    const handleSubmit = (event) => {
        event.preventDefault();   
        console.log(username, password)

       
    
    const data = {
        Name: username,
        Password: password
    };

    fetch('https://myfilms-2457a2cd41b6.herokuapp.com/login', {

       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
        
        },
       
        body: JSON.stringify(data)
        
    }).then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
        }else{
            alert('No such user');
         }
  
})
    .catch((e) => {
        alert('Something went wrong');
});
    
    };
return (
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
            type= 'text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength='3'
            />
        </Form.Group>

        <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type= 'password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
         </Form.Group>


        <Button variant='primary' type ='submit'>
            Login
        </Button>    
    </Form>
  );
}; 
