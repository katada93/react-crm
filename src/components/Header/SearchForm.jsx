import { useCallback, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(value);
    },
    [onSubmit, value]
  );

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        placeholder='Search'
        className='mr-sm-2'
      />
      <Button variant='outline-primary' type='submit'>
        Search
      </Button>
    </Form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  onSubmit() {},
};

export default SearchForm;
