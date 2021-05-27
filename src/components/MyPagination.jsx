import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";
import { useMemo } from "react";

const MyPagination = ({ pageCount, activePage, onChange }) => {
  const arrOfPages = useMemo(
    () =>
      Array(pageCount)
        .fill()
        .map((_, i) => i + 1),
    [pageCount]
  );

  return (
    <Pagination style={{ justifyContent: "flex-end" }}>
      {arrOfPages.map((page) => (
        <Pagination.Item
          onClick={() => onChange(page)}
          active={activePage === page}
          key={page}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

MyPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  activePage: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

MyPagination.defaultProps = {
  pageCount: 0,
  activePage: 1,
  onChange() {}
};

export default MyPagination;
