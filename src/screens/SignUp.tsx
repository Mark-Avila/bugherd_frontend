import { ChangeEvent, useState } from "react";
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
import authService from "../services/authService";
import { MuiTelInput } from "mui-tel-input";
import { SignUpData } from "../types";

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

type InputField =
  | "fname"
  | "lname"
  | "password1"
  | "password2"
  | "email"
  | "contact";

interface InputData<T> {
  value: T;
  label: string;
  isError: boolean;
  helper: string;
}

export default function SignUp({ handleScreen }: Props) {
  const [strength, setStrength] = useState<number>(0);

  const [fname, setFname] = useState<InputData<string>>({
    value: "",
    label: "First name",
    isError: false,
    helper: "",
  });

  const [lname, setLname] = useState<InputData<string>>({
    value: "",
    label: "Last name",
    isError: false,
    helper: "",
  });

  const [email, setEmail] = useState<InputData<string>>({
    value: "",
    label: "Email",
    isError: false,
    helper: "",
  });

  const [contact, setContact] = useState<InputData<string>>({
    value: "+63",
    label: "Phone number",
    isError: false,
    helper: "",
  });

  const [password1, setPassword1] = useState<InputData<string>>({
    value: "",
    label: "Password",
    isError: false,
    helper: "",
  });

  const [password2, setPassword2] = useState<InputData<string>>({
    value: "",
    label: "Confirm Password",
    isError: false,
    helper: "",
  });

  const [bday, setBday] = useState<InputData<Dayjs | null>>({
    value: dayjs("2023-04-07"),
    label: "Birthday",
    isError: false,
    helper: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let flag = false;

    if (fname.value === "") {
      flag = true;
      setFname((prev) => ({ ...prev, isError: true }));
    }

    if (lname.value === "") {
      flag = true;
      setLname((prev) => ({ ...prev, isError: true }));
    }

    if (email.value === "") {
      flag = true;
      setEmail((prev) => ({ ...prev, isError: true }));
    }

    if (password1.value === "") {
      flag = true;
      setPassword1((prev) => ({ ...prev, isError: true }));
    }

    if (password2.value === "") {
      flag = true;
      setPassword2((prev) => ({ ...prev, isError: true }));
    }

    if (contact.value === "+63") {
      flag = true;
      setContact((prev) => ({ ...prev, isError: true }));
    }

    if (flag) {
      return enqueueSnackbar("Missing fields", { variant: "error" });
    }

    if (password1.value !== password2.value) {
      setPassword1((prev) => ({ ...prev, isError: true }));
      setPassword2((prev) => ({ ...prev, isError: true }));
      return enqueueSnackbar("Passwords do not match", {
        variant: "error",
      });
    }

    if (!bday.value) {
      setBday((prev) => ({ ...prev, isError: true }));
      return enqueueSnackbar("Invalid Birthday");
    }

    const newContact = contact.value.replace(/ /g, "");

    const signUpData: SignUpData = {
      fname: fname.value,
      lname: lname.value,
      password: password1.value,
      email: email.value,
      contact: newContact,
      bday: bday.value.toISOString(),
    };

    try {
      const response = await authService.signup(signUpData);

      if (response.status === 201) {
        enqueueSnackbar("Successfully registered");
        handleScreen();
      }
    } catch (err: unknown) {
      enqueueSnackbar((err as Error).message);
    }
  };

  const evaluatePassword = (password: string): number => {
    let errors = [];
    if (password.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (password.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: InputField
  ) => {
    switch (target) {
      case "fname":
        setFname((prev) => ({
          ...prev,
          value: e.target.value,
          isError: false,
        }));
        break;
      case "lname":
        setLname((prev) => ({
          ...prev,
          value: e.target.value,
          isError: false,
        }));
        break;
      case "email":
        setEmail((prev) => ({
          ...prev,
          value: e.target.value,
          isError: false,
        }));
        break;
      case "password1":
        setPassword1((prev) => ({
          ...prev,
          value: e.target.value,
          isError: false,
        }));
        break;
      case "password2":
        setPassword2((prev) => ({
          ...prev,
          value: e.target.value,
          isError: false,
        }));
        break;

      default:
        break;
    }
  };

  // const handleContactOnChange = (value: string) => setContact(value);

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
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  helperText={fname.helper}
                  error={fname.isError}
                  required
                  fullWidth
                  autoFocus
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "fname")
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={lname.isError}
                  helperText={lname.helper}
                  required
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "lname")
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  error={email.isError}
                  helperText={email.helper}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "email")
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  error={contact.isError}
                  value={contact.value}
                  helperText={contact.helper}
                  inputProps={{ maxLength: 12 }}
                  fullWidth
                  size="small"
                  onlyCountries={["PH"]}
                  defaultCountry="PH"
                  forceCallingCode
                  onChange={handleContactOnChange}
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
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  error={password1.isError}
                  helperText={password1.helper}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "password1")
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password-2"
                  label="Re-enter password"
                  helperText={password2.helper}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "password2")
                  }
                  error={lname.isError}
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
