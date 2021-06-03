import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../features/users/usersSlice';
import SearchForm from './SearchForm';

const Header = () => {
  const dispatch = useDispatch();

  const search = (text) => {
    dispatch(searchUser(text));
  };

  return (
    <Navbar expand='md' bg='dark' variant='dark' className='mb-5'>
      <Container>
        <Navbar.Brand href='/'>Users</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link href='#pricing'>Pricing</Nav.Link>
        </Nav>
        <SearchForm onSubmit={search} />
      </Container>
    </Navbar>
  );
};

export default Header;
