import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useSnackbar } from "notistack";
import { ResponseBody } from "../types";

type ErrorBody = ResponseBody<unknown>;

function useSnackError() {
  const { enqueueSnackbar } = useSnackbar();

  const snackbarError = (err: FetchBaseQueryError) => {
    if ("error" in err) {
      enqueueSnackbar("Connection failed", { variant: "error" });
    } else if ("message" in (err.data as ErrorBody)) {
      enqueueSnackbar((err.data as ErrorBody).message, {
        variant: "error",
      });
    }
  };

  return { snackbarError };
}

export default useSnackError;
