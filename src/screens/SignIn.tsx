import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TypographyProps } from "@mui/material/Typography";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ResponseBody, SignInData } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSigninMutation } from "../api/userApiSlice";

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
const defaultTheme = createTheme();

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

  const [signin] = useSigninMutation();

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
        .then((res: ResponseBody<unknown>) => {
          if (res.success) {
            enqueueSnackbar(res.message, {
              variant: "success",
            });

            navigate("/dashboard");
          }
        })
        .catch((err) => {
          if ("error" in err) {
            enqueueSnackbar("Connection failed", { variant: "error" });
          } else if ("message" in err.data) {
            enqueueSnackbar(err.data.message, { variant: "error" });
          }
        });
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              size="small"
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={handleScreen}
                  style={{ textTransform: "none" }}
                  size="small"
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
