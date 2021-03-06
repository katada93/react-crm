import { useState, useEffect, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../Input";
import PropTypes from "prop-types";

const UserForm = (props) => {
  const { user, show, closeText, doneText, onDone, onClose } = props;

  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [age, setAge] = useState(user.age);

  const nameRef = useRef();
  const surnameRef = useRef();
  const ageRef = useRef();
  const doneRef = useRef();

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setAge(user.age);
  }, [user]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Input
          ref={nameRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && surnameRef.current) {
              console.log(surnameRef.current);
              surnameRef.current.focus();
            }
          }}
          initValue={name}
          onChange={setName}
          placeholder="name"
        />
        <Input
          ref={surnameRef}
          initValue={surname}
          onChange={setSurname}
          placeholder="surname"
        />
        <Input
          ref={ageRef}
          initValue={age}
          onChange={setAge}
          type="number"
          placeholder="age"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {closeText}
        </Button>
        <Button
          ref={doneRef}
          variant="primary"
          onClick={() => onDone({ ...user, name, surname, age })}
        >
          {doneText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  show: PropTypes.bool.isRequired,
  closeText: PropTypes.string.isRequired,
  doneText: PropTypes.string.isRequired,
  onDone: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

UserForm.defaultProps = {
  user: { name: "", surname: "", age: 0 },
  closeText: "Close",
  doneText: "Done",
  onDone() {},
  onClose() {}
};
