import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserForm from "./UserForm";

const UpdateUserForm = (props) => {
  const { user, show, setShow, onUpdate } = props;

  return (
    <UserForm
      doneText="Update user"
      user={user}
      show={show}
      onClose={() => setShow(false)}
      onDone={(data) => {
        setShow(false);
        onUpdate(data.id, data);
      }}
    />
  );
};

export default UpdateUserForm;

// const UpdateUserForm = ({ user, show, setShow, onUpdate }) => {
//   const [state, setState] = useState({
//     name: '',
//     surname: '',
//     age: '',
//   });

//   console.log(user);

//   const handleFetch = () => {
//     onUpdate(user.id, state);
//     setShow(false);
//   };

//   useEffect(() => {
//     setState({ name: user?.name, surname: user?.surname, age: user?.age });
//   }, [user]);

//   return (
//     <Modal show={show}>
//       <Modal.Header closeButton>
//         <Modal.Title>Update User</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <input
//           value={state.name}
//           onChange={(e) =>
//             setState((prev) => ({ ...prev, name: e.target.value }))
//           }
//           placeholder='name'
//         />
//         <br />
//         <br />
//         <input
//           value={state.surname}
//           onChange={(e) =>
//             setState((prev) => ({ ...prev, surname: e.target.value }))
//           }
//           placeholder='surname'
//         />
//         <br />
//         <br />
//         <input
//           value={state.age}
//           onChange={(e) =>
//             setState((prev) => ({ ...prev, age: e.target.value }))
//           }
//           placeholder='age'
//         />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant='secondary' onClick={() => setShow(false)}>
//           Close
//         </Button>
//         <Button variant='primary' onClick={handleFetch}>
//           Update User
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default UpdateUserForm;
