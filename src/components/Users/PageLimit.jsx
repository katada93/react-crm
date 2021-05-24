import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLimit } from "../../features/users/usersSlice";

const PageLimit = () => {
  const dispatch = useDispatch();
  const { limit } = useSelector(({ users }) => users);

  return (
    <ButtonGroup className="mb-3">
      {[5, 10, 15].map((item) => (
        <Button
          variant={item === limit ? "primary" : "secondary"}
          onClick={() => dispatch(setLimit(item))}
          key={item}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default PageLimit;
