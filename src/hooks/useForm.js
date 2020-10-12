import { useState } from 'react';

// Utilidad: Leer los textbox o cajas de texto cuando el input change cambie del formulario

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    // verifica el inputBox
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setValues({ ...values, [target.name]: value });
  };

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  return [values, handleInputChange, reset];
};
