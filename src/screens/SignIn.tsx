import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import { TypographyProps } from "@mui/material/Typography";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ResponseBody, SignInData, User } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSigninMutation } from "../api/userApiSlice";
import { useSnackError } from "../hooks";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";

function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Bugherd | Developed by Mark Avila
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
interface Props {
  handleScreen: VoidFunction;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email address")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

export default function SignIn({ handleScreen }: Props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();
  const [signin, { isLoading: isLoading }] = useSigninMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload: SignInData = {
        email: values.email,
        password: values.password,
      };

      signin(payload)
        .unwrap()
        .then((res: ResponseBody<User>) => {
          if (res.success) {
            enqueueSnackbar(res.message, {
              variant: "success",
            });
            dispatch(setUser(res.data));
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          snackbarError(err);
        });
    },
  });

  return (
    <>
      {isLoading && (
        <CircularProgress
          sx={{ position: "absolute", top: 0, left: 0, margin: 4 }}
        />
      )}
      <Box component="main">
        <CssBaseline />
        <Stack
          sx={{
            marginTop: 8,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            width={{
              xs: "100%",
              lg: "400px",
            }}
            alignItems="center"
            padding={{
              xs: "1rem",
              lg: "0",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{
                mt: 4,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                id="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                required
                fullWidth
                size="small"
                placeholder="Email"
                disabled={isLoading}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.password && formik.errors.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                size="small"
                required
                fullWidth
                placeholder="Password"
                disabled={isLoading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    onClick={handleScreen}
                    style={{ textTransform: "none" }}
                    size="small"
                    disabled={isLoading}
                  >
                    Don't have an account? Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Box>
    </>
  );
}
