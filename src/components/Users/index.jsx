import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers,
  setActivePage,
  setLimit,
  useUsers,
} from '../../features/users/usersSlice';
import deleteImg from '../../images/delete.svg';
import editImg from '../../images/edit.svg';
import PageLimit from '../PageLimit';
import MyPagination from '../MyPagination';
import UserForm from './UserForm';

const Users = () => {
  const dispatch = useDispatch();

  const { users, activePage, limit, pageCount } = useUsers();

  const [show, setShow] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers(activePage, limit));
  }, [dispatch, activePage, limit]);

  const userUpdate = useCallback(
    async (id, data) => {
      await dispatch(editUser(id, data));
      dispatch(fetchUsers(activePage, limit));
    },
    [dispatch, activePage, limit]
  );

  const userCreate = useCallback(
    async (data) => {
      await dispatch(addUser(data));
      dispatch(fetchUsers(activePage, limit));
    },
    [dispatch, activePage, limit]
  );

  const userDelete = useCallback(
    async (id) => {
      await dispatch(deleteUser(id));
      dispatch(fetchUsers(activePage, limit));
    },
    [dispatch, activePage, limit]
  );

  return (
    <Container>
      <UserForm
        action={action}
        id={activeUser}
        show={show}
        setShow={setShow}
        onUpdate={userUpdate}
        onCreate={userCreate}
      />

      <PageLimit
        limit={limit}
        onChange={(limit) => dispatch(setLimit(limit))}
      />

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
                    setShow(true);
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
                  onClick={() => userDelete(user.id)}
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
            setShow(true);
            setAction('add');
          }}
        >
          Add user
        </Button>

        <MyPagination
          pageCount={pageCount}
          activePage={activePage}
          onChange={(page) => dispatch(setActivePage(page))}
        />
      </footer>
    </Container>
  );
};

export default Users;
