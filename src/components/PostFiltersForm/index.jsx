import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';


PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmit: null,
};

function PostFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTeam] = useState('');
  const typingTimeOutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTeam(value); 

    if (!onSubmit) return;

    if (typingTimeOutRef) {
      clearTimeout(typingTimeOutRef.current);
    }

    typingTimeOutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 500);

    
    
  }

  return (
    <form action="">
      <input 
        type="text" 
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </form>
  );
}

export default PostFiltersForm;