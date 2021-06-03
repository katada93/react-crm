import { forwardRef, useCallback, useState } from "react";
import PropTypes from "prop-types";

const Input = forwardRef((props, ref) => {
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

  return <input ref={ref} value={value} onChange={changeHandler} {...datum} />;
});

Input.displayName = "Input";

export default Input;

Input.propTypes = {
  initValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired
};

Input.defaultProps = {
  initValue: "",
  onChange() {},
  onEnter() {}
};
