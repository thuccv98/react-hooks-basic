import PropTypes from 'prop-types';
import { useState } from 'react';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
}

TodoForm.defaultProps = {
  onSubmit: null,
}

function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState('');

  function handleValueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();//Prevent reloading browser
    if (!onSubmit) return;

    const formValues = {
      title: value,
    };
    onSubmit(formValues);

    setValue(''); //reset form
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={value} 
        onChange={handleValueChange} 
      />
    </form>
  );
}
export default TodoForm;