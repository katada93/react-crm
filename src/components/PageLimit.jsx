import { Button, ButtonGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const PageLimit = (props) => {
  const { limit, variants, onChange } = props;

  return (
    <ButtonGroup className="mb-3">
      {variants.map((item) => (
        <Button
          key={item}
          variant={item === limit ? "primary" : "secondary"}
          onClick={() => onChange(item)}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};

PageLimit.propTypes = {
  limit: PropTypes.number.isRequired,
  variants: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired
};

PageLimit.defaultProps = {
  limit: 1,
  variants: [5, 10, 15],
  onChange() {}
};

export default PageLimit;
