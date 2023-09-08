import { useSnackbar } from "notistack";

// Define a type guard function
function isFetchBaseQueryError(err: unknown): err is { error: string } {
  return typeof err === "object" && err !== null && "error" in err;
}

// Usage in your code
function useSnackError() {
  const { enqueueSnackbar } = useSnackbar();

  const handleErrorMessage = (err: unknown) => {
    if (isFetchBaseQueryError(err)) {
      enqueueSnackbar("Connection failed", { variant: "error" });
    } else if (typeof err === "object" && err !== null && "message" in err) {
      enqueueSnackbar((err as { message: string }).message, {
        variant: "error",
      });
    }
  };

  return { handleErrorMessage };
}

export default useSnackError;
