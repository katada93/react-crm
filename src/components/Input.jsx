import { useCallback, useState } from "react";
import PropTypes from "prop-types";

export default function Input(props) {
  const { initValue, onChange, onEnter, ...datum } = props;

  const [value, setValue] = useState(initValue);

  const changeHandler = useCallback(
    (e) => {
      const { value } = e.target;
      if (e.key === "Enter") {
        onEnter(value);
      } else {
        setValue(value);
        onChange(value);
      }
    },
    [onChange, onEnter]
  );

  return <input value={value} onChange={changeHandler} {...datum} />;
}

Input.propTypes = {
  initValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired
};

Input.defaultProps = {
  initValue: "",
  onChange() {},
  onEnter() {}
};
