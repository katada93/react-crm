import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers,
  setActivePage,
  setLimit,
  useUsers
} from "../../features/users/usersSlice";
import deleteImg from "../../images/delete.svg";
import editImg from "../../images/edit.svg";
import PageLimit from "../PageLimit";
import MyPagination from "../MyPagination";
import CreateUserFrom from "./CreateUserFrom";
import UpdateUserForm from "./UpdateUserForm";
import UnderLoader from "../UnderLoader";

const Users = () => {
  const dispatch = useDispatch();
  const { users, activePage, limit, pageCount, loading } = useUsers();

  const [showCreate, setShowCreateForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

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
      <CreateUserFrom
        show={showCreate}
        setShow={setShowCreateForm}
        onCreate={userCreate}
      />

      <UpdateUserForm
        user={users.find((user) => user.id === activeUser)}
        show={showUpdate}
        setShow={setShowUpdate}
        onUpdate={userUpdate}
      />

      <PageLimit
        limit={limit}
        onChange={(limit) => dispatch(setLimit(limit))}
      />

      <UnderLoader loading={loading}>
        <Table striped bordered hover variant="dark" size="md">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td style={{ textAlign: "center" }}>
                  <img
                    onClick={() => {
                      setActiveUser(user.id);
                      setShowUpdate(true);
                    }}
                    style={{
                      marginRight: "20px",
                      cursor: "pointer"
                    }}
                    src={editImg}
                    alt="Edit"
                  />
                  <img
                    onClick={() => userDelete(user.id)}
                    style={{ cursor: "pointer" }}
                    src={deleteImg}
                    alt="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </UnderLoader>

      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30px"
        }}
      >
        <Button
          onClick={() => {
            setShowCreateForm(true);
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
