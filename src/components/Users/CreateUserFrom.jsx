import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const CreateUserFrom = ({ show, setShow, onCreate }) => {
  const [state, setState] = useState({
    name: '',
    surname: '',
    age: '',
  });

  const handleFetch = () => {
    onCreate(state);
    setShow(false);
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder='name'
        />
        <br />
        <br />
        <input
          value={state.surname}
          onChange={(e) =>
            setState((prev) => ({ ...prev, surname: e.target.value }))
          }
          placeholder='surname'
        />
        <br />
        <br />
        <input
          value={state.age}
          onChange={(e) =>
            setState((prev) => ({ ...prev, age: e.target.value }))
          }
          placeholder='age'
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant='primary' onClick={handleFetch}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserFrom;
