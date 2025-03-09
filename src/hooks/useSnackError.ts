import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useSnackbar } from "notistack";
import { ResponseBody } from "../types";

// Define the shape of an error response body.
type ErrorBody = ResponseBody<unknown>;

/**
 * Custom hook for displaying error messages as snackbar notifications.
 * Uses the `useSnackbar` hook from the `notistack` library.
 */
function useSnackError() {
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Display an error message as a snackbar notification.
   */
  const snackbarError = (err: FetchBaseQueryError, message?: string) => {
    if ("error" in err) {
      enqueueSnackbar("Connection failed", { variant: "error" });
    } else if ("message" in (err.data as ErrorBody)) {
      if (message) {
        enqueueSnackbar(message, {
            variant: "error",
        });
      }
      enqueueSnackbar((err.data as ErrorBody).message, {
        variant: "error",
      });
    }
  };

  return { snackbarError };
}

export default useSnackError;
