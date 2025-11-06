import { useState, useCallback } from 'react';

export const useApiMutation = (mutationHook, options = {}) => {
  const {
    onSuccess = null,
    onError = null,
    successMessage = 'Operation successful!',
    errorMessage = 'Operation failed!',
    showNotifications = true,
  } = options;

  const [trigger, result] = mutationHook();
  
  const [state, setState] = useState({
    showSuccess: false,
    showError: false,
    message: '',
  });

  const execute = useCallback(async (data) => {
    try {
      setState({ showSuccess: false, showError: false, message: '' });
      
      const response = await trigger(data).unwrap();
      
      if (showNotifications) {
        setState({
          showSuccess: true,
          showError: false,
          message: successMessage,
        });
      }

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (error) {
      if (showNotifications) {
        setState({
          showSuccess: false,
          showError: true,
          message: error?.data?.message || errorMessage,
        });
      }

      if (onError) {
        onError(error);
      }

      throw error;
    }
  }, [trigger, onSuccess, onError, successMessage, errorMessage, showNotifications]);

  const reset = useCallback(() => {
    setState({ showSuccess: false, showError: false, message: '' });
    if (result.reset) {
      result.reset();
    }
  }, [result]);

  const dismissNotification = useCallback(() => {
    setState(prev => ({ ...prev, showSuccess: false, showError: false }));
  }, []);

  return {
    execute,
    reset,
    dismissNotification,
    isLoading: result.isLoading,
    isSuccess: result.isSuccess,
    isError: result.isError,
    data: result.data,
    error: result.error,
    ...state,
  };
};