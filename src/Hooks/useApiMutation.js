import { useCallback, useEffect, useState } from "react";
import { toast } from "../components/ToastContainer";

export const useApiMutation = (mutationHook, options = {}) => {
  const [trigger, result] = mutationHook();
  const [isTriggered, setTriggered] = useState(false);

  const {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = result;

  const runMutation = useCallback(
    async (...args) => {
      setTriggered(true);
      try {
        const res = await trigger(...args).unwrap();
        if (options?.showNotifications && options?.successMessage) {
          toast.success("Success", { message: options.successMessage });
        }
        return res;
      } catch (err) {
        if (options?.showNotifications && options?.errorMessage) {
          toast.error("Error", { message: options.errorMessage });
        }
        throw err;
      }
    },
    [trigger, options]
  );

  useEffect(() => {
    if (isError && isTriggered && options?.showNotifications && !options?.errorMessage) {
      toast.error("Error", { message: error?.data?.message || "Something went wrong!" });
    }
  }, [isError, isTriggered, options, error]);

  return { trigger: runMutation, data, error, isLoading, isSuccess, isError, reset };
};
