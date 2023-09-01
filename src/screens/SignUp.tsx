import { ChangeEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiPhoneNumber from "mui-phone-number";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

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

export default function SignUp({ handleScreen }: Props) {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [bday, setBday] = useState<Dayjs | null>(dayjs("2022-04-17"));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: InputField
  ) => {
    switch (target) {
      case "fname":
        setFname(e.currentTarget.value);
        break;
      case "lname":
        setLname(e.currentTarget.value);
        break;
      case "password1":
        setPassword1(e.currentTarget.value);
        break;
      case "password2":
        setPassword2(e.currentTarget.value);
        break;
      case "email":
        setEmail(e.currentTarget.value);
        break;

      default:
        break;
    }
  };

  // const handleContactOnChange = (value: string) => setContact(value);

  const handleContactOnChange: (
    e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void = (e) => {
    setContact(e as string);
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "fname")
                  }
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "lname")
                  }
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "email")
                  }
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  variant="outlined"
                  defaultCountry={"ph"}
                  size="small"
                  fullWidth
                  onChange={handleContactOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  sx={{ width: "100%" }}
                  slotProps={{ textField: { size: "small" } }}
                  label="Birthday"
                  value={bday}
                  onChange={(newDate) => setBday(newDate)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "password1")
                  }
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password-2"
                  label="Re-enter password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(e, "password2")
                  }
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
