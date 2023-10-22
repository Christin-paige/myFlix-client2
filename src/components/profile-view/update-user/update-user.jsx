import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const UpdateUser = ({handleUpdate, handleSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    //const [token, setToken] = useState(null);
  

  
    const user = {
        Name: username,
        Password: password,
        Email: email
        
    };
   
    function handleUpdate (event) {
       
       event.preventDefault()
    
       console.log(handleUpdate,'what has changed')
//Able to update user on postman but am getting a 404 here
   useEffect(() => {
    
      fetch(`https://myfilms-2457a2cd41b6.herokuapp.com/users/${user.Name}`, {
            method: 'PUT',
         headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        
    })
    .then((response) => {
    /*response.json())
    .then((data) => {*/
    console.log('response',response);
            if (response.ok) {
                alert('user updated!');
                localStorage.setItem('user', JSON.stringify(user)),
                window.location.reload();
               
            }else{
                const errorText = response.text();
                console.error('Error: ' + errorText);
                alert('Update Failed');
            }
    })
    .catch((error) => {
        console.error('Error 2: ' + error);
    })
    })
    
    console.log(user, 'this is user')

/*
  function handleDeregister() {
    useEffect(() => {
    fetch(`https://myfilms-2457a2cd41b6.herokuapp.com/users/${user.Name}`, {
        method: 'DELETE',
        headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        }
    }
    )

.then((response) => {
    localStorage.clear()
            alert('User Deleted!');
        })
    })
*/
return (
    <Form>
    <Form.Group className='mb-3' controlId='profile-form' onSubmit={(e) => handleUpdate(e)}>
        <h2>Want to change some info?</h2>
    </Form.Group>
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId='UpdateUsername'>
            <Form.Label>New Username:</Form.Label>
            <Form.Control
            type= 'text'
            defaultvalue={user.Name}
            onChange={(e) => setUsername(e.target.value)}
            minLength='3'
            />
        </Form.Group>
        
        <Form.Group  controlId='UpdatePassword'>
            <Form.Label>New Password:</Form.Label>
            <Form.Control
            type= 'password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />
        </Form.Group>
        <Form.Group className='mb-3' controlId='UpdateEmail'>
            <Form.Label>New Email:</Form.Label>
            <Form.Control
            type= 'email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          
            />

        </Form.Group>
        

   <Button variant='primary' type='submit' 
   onClick={handleSubmit}>
        Update
    </Button>    
</Form>
<p>If you would like to delete your account, please click below</p>
 <Button
 variant='danger'
 size = 'lg'
 //onClick={handleDeregister}
>Delete Account</Button>
</Form>
);
};
