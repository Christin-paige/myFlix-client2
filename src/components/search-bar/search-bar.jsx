import { useState } from'react';
import { useState } from'react';
import { Form, Row, Col } from 'react-bootstrap';

export const SearchBar = ({ onSearch }) => {

const [searchInput, setSearchInput] = useState('');


const handleSearchInput = (e) => {
   const newSearchInput = e.target.value;
   setSearchInput(newSearchInput);

   if (newSearchInput === '') {
    onSearch('');
   }else{
    onSearch(newSearchInput);
   }
  };

return (

  <Form>
  <Row>
    <Col xs="auto"  md={{ span: 3, offset: 9}}>
   
      <Form.Control
        id="search-bar"
        type="text"
        placeholder="Search movie by title"
        className="mr-sm-2"
        value={searchInput}
        onChange={handleSearchInput}
      />
    </Col>
   </Row>
  </Form>
 
);
}


