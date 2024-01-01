import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate} from 'react-router-dom';
import '../assets/css/navbar.css';

const NavbarCustomer=()=>{
  const navigate=useNavigate();


  const handleLogout = () =>{
    localStorage.clear();
    return navigate('/');
  }
  return (
    <Navbar className='customNavbar fixed-top ' variant="dark" expand="lg">
      <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
        <Navbar.Brand className='px-2'  href={`/profileBuyer`}>W a s h i f y</Navbar.Brand>
        <Navbar.Toggle className='px-2' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link href={`/customer/profile`}>Profile</Nav.Link>
            <Nav.Link href={`/customer/laundry`}>Laundries</Nav.Link>
            <Nav.Link href={`/customer/order`}>My Orders</Nav.Link>
            <Nav.Link className="d-block d-lg-none c" onClick={handleLogout}>Log Out</Nav.Link>
            
          </Nav>
          <div className="customLogOut d-none d-lg-flex justify-content-end">
          <Button variant='info' onClick={handleLogout}>Log Out</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavbarCustomer;

