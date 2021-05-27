import { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Input from "../Input";
import UserForm from "./UserForm";

const CreateUserFrom = (props) => {
  const { show, setShow, onCreate } = props;

  return (
    <UserForm
      doneText="Create"
      show={show}
      onClose={() => setShow(false)}
      onDone={(data) => {
        setShow(false);
        onCreate(data);
      }}
    />
  );
};

export default CreateUserFrom;

// const CreateUserFrom = ({ show, setShow, onCreate }) => {
//   const [state, setState] = useState({
//     name: "",
//     surname: "",
//     age: ""
//   });

//   const handleFetch = () => {
//     onCreate(state);
//     setShow(false);
//   };

//   const stateUpdate = useCallback((patch) => {
//     setState((x) => ({
//       ...x,
//       ...patch
//     }));
//   }, []);

//   return (
//     <Modal show={show}>
//       <Modal.Header closeButton>
//         <Modal.Title>Create User</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Input onChange={(name) => stateUpdate({ name })} placeholder="name" />
//         <br />
//         <br />
//         <input
//           value={state.surname}
//           onChange={(e) =>
//             setState((prev) => ({ ...prev, surname: e.target.value }))
//           }
//           placeholder="surname"
//         />
//         <br />
//         <br />
//         <input
//           value={state.age}
//           onChange={(e) =>
//             setState((prev) => ({ ...prev, age: e.target.value }))
//           }
//           placeholder="age"
//         />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShow(false)}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleFetch}>
//           Add User
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };
