import { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { TypographyProps } from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "notistack";
import { MuiTelInput } from "mui-tel-input";
import * as yup from "yup";
import { useFormik } from "formik";
import { InputData, ResponseBody, SignUpData } from "../types";
import { useSignupMutation } from "../api/userApiSlice";
import { useSnackError } from "../hooks";

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

const defaultTheme = createTheme();

interface Props {
  handleScreen: VoidFunction;
}

const validationSchema = yup.object({
  fname: yup
    .string()
    .min(2, "First name is too short")
    .required("First name is required"),
  lname: yup
    .string()
    .min(2, "Last name is too short")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password1: yup.string().required("Password is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignUp({ handleScreen }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();

  const [contact, setContact] = useState<InputData<string>>({
    value: "",
    helper: "",
    isError: false,
    label: "Contact",
  });

  const [bday, setBday] = useState<InputData<Dayjs | null>>({
    value: dayjs("2023-01-01"),
    helper: "",
    isError: false,
    label: "Contact",
  });

  const [signup] = useSignupMutation();

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password1: "",
      password2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (bday.value === null || !bday.value) {
        enqueueSnackbar("Birthday is invalid");
        return;
      }

      const payload: SignUpData = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password1,
        contact: contact.value.replace(/\s+/g, ""),
        bday: bday.value.toISOString(),
      };

      signup(payload)
        .unwrap()
        .then((res: ResponseBody<unknown>) => {
          if (res.success) {
            enqueueSnackbar("Successfully registered", { variant: "success" });
            handleScreen();
          }
        })
        .catch((err) => {
          snackbarError(err);
        });
    },
  });

  const handleContactOnChange = (val: string) => {
    setContact((prev) => ({
      ...prev,
      value: val,
      isError: false,
    }));
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="fname"
                  label="First Name"
                  size="small"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.fname && formik.errors.fname}
                  error={formik.touched.fname && Boolean(formik.errors.fname)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lname"
                  label="Last Name"
                  size="small"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.lname && formik.errors.lname}
                  error={formik.touched.lname && Boolean(formik.errors.lname)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  size="small"
                  type="email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.email && formik.errors.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  id="contact"
                  name="contact"
                  value={contact.value}
                  onChange={handleContactOnChange}
                  helperText={contact.helper}
                  error={contact.isError}
                  fullWidth
                  size="small"
                  defaultCountry="PH"
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  sx={{ width: "100%" }}
                  slotProps={{ textField: { size: "small" } }}
                  label="Birthday"
                  value={bday.value}
                  onChange={(newDate) =>
                    setBday((prev) => ({ ...prev, value: newDate }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password1"
                  label="Password"
                  type="password"
                  id="password-1"
                  required
                  size="small"
                  fullWidth
                  value={formik.values.password1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.password1 && formik.errors.password1
                  }
                  error={
                    formik.touched.password1 && Boolean(formik.errors.password1)
                  }
                />
              </Grid>
              {/* <Grid item xs={12}>
                <PasswordStrength value={strength} />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  name="password2"
                  type="password"
                  id="password-2"
                  size="small"
                  label="Re-enter password"
                  required
                  fullWidth
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.password2 && formik.errors.password2
                  }
                  error={
                    formik.touched.password2 && Boolean(formik.errors.password2)
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={handleScreen}
                  style={{ textTransform: "none" }}
                  size="small"
                >
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
