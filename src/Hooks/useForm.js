// hooks/useForm.js
import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field
    if (validationRules[name]) {
      const error = validationRules[name](values[name], values);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [values, validationRules]);

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](values[field], values);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setFieldValue,
    setFieldError,
    setValues,
  };
};