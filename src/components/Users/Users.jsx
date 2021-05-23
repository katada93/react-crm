import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Pagination,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  fetchUsers,
  setLimit,
  setActivePage,
} from '../../features/users/usersSlice';
import deleteImg from '../../images/delete.svg';
import editImg from '../../images/edit.svg';
import UserForm from './UserForm';

const Users = () => {
  const dispatch = useDispatch();
  const { users, activePage, limit, pageCount } = useSelector(
    ({ users }) => users
  );
  const [showEdit, setShowEdit] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [action, setAction] = useState(null);
  const arrOfPages = Array(pageCount)
    .fill()
    .map((_, i) => i + 1);

  useEffect(() => {
    dispatch(fetchUsers(activePage, limit));
  }, [dispatch, activePage, limit]);

  return (
    <Container>
      <UserForm
        action={action}
        id={activeUser}
        show={showEdit}
        setShow={setShowEdit}
      />
      <ButtonGroup className='mb-3'>
        {[5, 10, 15].map((item) => (
          <Button
            variant={item === limit ? 'primary' : 'secondary'}
            onClick={() => dispatch(setLimit(item))}
            key={item}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
      <Table striped bordered hover variant='dark' size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td style={{ display: 'flex', alignItems: 'center' }}>
                {user.name}
                <img
                  onClick={() => {
                    setShowEdit(true);
                    setActiveUser(user.id);
                    setAction('edit');
                  }}
                  style={{
                    marginLeft: 'auto',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                  src={editImg}
                  alt='Edit'
                />
                <img
                  onClick={() =>
                    dispatch(deleteUser(user.id, activePage, limit))
                  }
                  style={{ cursor: 'pointer' }}
                  src={deleteImg}
                  alt='Delete'
                />
              </td>
              <td>{user.surname}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            setShowEdit(true);
            setAction('add');
          }}
        >
          Add user
        </Button>
        <Pagination style={{ justifyContent: 'flex-end' }}>
          {arrOfPages.map((page) => (
            <Pagination.Item
              onClick={() => dispatch(setActivePage(page))}
              active={activePage === page}
              key={page}
            >
              {page}
            </Pagination.Item>
          ))}
        </Pagination>
      </footer>
    </Container>
  );
};

export default Users;
