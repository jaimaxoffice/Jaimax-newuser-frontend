import { useMemo, useCallback, useEffect, useRef } from "react";
import { useNotification } from "./useNotification";

export const useApiQuery = (queryHook, queryParams = "", options = {}) => {
  const memoizedParams = useMemo(() => queryParams, [queryParams]);
  const { showNotification } = useNotification();
  const notificationShownRef = useRef(false);
  const lastErrorRef = useRef(null);

  const {
    data,
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    isUninitialized,
    refetch,
    ...rest
  } = queryHook(memoizedParams, {
    skip: options.skip || false,
    pollingInterval: options.pollingInterval || 0,
    refetchOnMountOrArgChange: options.refetchOnMountOrArgChange || false,
    refetchOnFocus: options.refetchOnFocus || false,
    refetchOnReconnect: options.refetchOnReconnect || true,
    ...options.queryOptions,
  });

  const handleSuccess = useCallback(() => {
    if (
      options?.showNotifications &&
      options?.successMessage &&
      !notificationShownRef.current &&
      data
    ) {
      showNotification("success", options.successMessage);
      notificationShownRef.current = true;
    }
  }, [options, showNotification, data]);

  const handleError = useCallback(() => {
    if (options?.showNotifications && error && !notificationShownRef.current) {
      const currentError = JSON.stringify(error);
      if (lastErrorRef.current !== currentError) {
        const errorMessage =
          options.errorMessage ||
          error?.data?.message ||
          error?.error ||
          error?.message ||
          "An error occurred. Please try again.";
        
        showNotification("error", errorMessage);
        notificationShownRef.current = true;
        lastErrorRef.current = currentError;
      }
    }
  }, [options, showNotification, error]);


  useEffect(() => {
    if (isSuccess && data && !isLoading) {
      handleSuccess();
    }
  }, [isSuccess, data, isLoading, handleSuccess]);

  useEffect(() => {
    if (isError && error && !isLoading) {
      handleError();
    }
  }, [isError, error, isLoading, handleError]);
  useEffect(() => {
    notificationShownRef.current = false;
    lastErrorRef.current = null;
  }, [memoizedParams]);
  const refetchWithNotification = useCallback(async () => {
    notificationShownRef.current = false;
    lastErrorRef.current = null;
    try {
      const result = await refetch();
      if (result.isSuccess && options?.showRefetchSuccess) {
        showNotification("success", "Data refreshed successfully");
      }
      return result;
    } catch (err) {
      if (options?.showNotifications) {
        showNotification("error", "Failed to refresh data");
      }
      throw err;
    }
  }, [refetch, options, showNotification]);

  return {
    data,
    error,
    isLoading: isLoading || (isFetching && isUninitialized),
    isFetching,
    isSuccess,
    isError,
    refetch: refetchWithNotification,
    ...rest,
  };
};