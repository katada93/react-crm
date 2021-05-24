import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../../features/users/usersSlice";

const UserForm = ({ id, action, show, setShow }) => {
  const dispatch = useDispatch();
  const { activePage, limit } = useSelector(({ users }) => users);
  const [state, setState] = useState({ name: "", surname: "", age: "" });

  const handleFetch = () => {
    if (action === "edit") {
      dispatch(editUser(id, state, activePage, limit));
    } else {
      dispatch(addUser(state, activePage, limit));
    }
    setState({ name: "", surname: "", age: "" });
    setShow(false);
  };
  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="name"
        />
        <br />
        <br />
        <input
          value={state.surname}
          onChange={(e) =>
            setState((prev) => ({ ...prev, surname: e.target.value }))
          }
          placeholder="surname"
        />
        <br />
        <br />
        <input
          value={state.age}
          onChange={(e) =>
            setState((prev) => ({ ...prev, age: e.target.value }))
          }
          placeholder="age"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFetch}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;
