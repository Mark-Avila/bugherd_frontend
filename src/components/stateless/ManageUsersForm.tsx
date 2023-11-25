import { Close, Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { FormikProps } from "formik";
import { InputData } from "../../types";
import { DatePicker } from "@mui/x-date-pickers";
import { MuiTelInput } from "mui-tel-input";

interface Props {
  formik: FormikProps<{
    fname: string;
    lname: string;
    email: string;
    role: number;
  }>;
  bday: InputData<Dayjs | null>;
  setBday: (new_bday: Dayjs | null) => void;
  contact: InputData<string>;
  setContact: (new_contact: string) => void;
  onSubmit: VoidFunction;
}

function ManageUsersForm({
  formik,
  setBday,
  setContact,
  bday,
  contact,
}: Props) {
  const handleRoleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue("role", event.target.value);
  };

  return (
    <Stack sx={{ paddingRight: 16 }} useFlexGap spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="user-role">Role</InputLabel>
        <Select
          labelId="user-role"
          id="user-role-select"
          variant="outlined"
          label="Role"
          name="title"
          value={formik.values.role.toString()}
          onChange={handleRoleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          fullWidth
        >
          <MenuItem value={0}>Developer</MenuItem>
          <MenuItem value={1}>Project Manager</MenuItem>
          <MenuItem value={2}>Administrator</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ marginY: 1 }} />
      <Stack
        marginBottom={2}
        spacing={3}
        useFlexGap
        direction="row"
        alignItems="center"
      >
        <Avatar sx={{ width: 56, height: 56 }} />
        <IconButton size="small">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <Close fontSize="small" />
        </IconButton>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="First Name"
            fullWidth
            size="small"
            name="fname"
            value={formik.values.fname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.fname && formik.errors.fname}
            error={formik.touched.fname && Boolean(formik.errors.fname)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Last Name"
            fullWidth
            size="small"
            name="lname"
            value={formik.values.lname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.lname && formik.errors.lname}
            error={formik.touched.lname && Boolean(formik.errors.lname)}
          />
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        label="Email"
        fullWidth
        size="small"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.email && formik.errors.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
      />
      <MuiTelInput
        id="contact"
        name="contact"
        value={contact.value}
        onChange={setContact}
        helperText={contact.helper}
        error={contact.isError}
        fullWidth
        size="small"
        defaultCountry="PH"
      />
      <DatePicker
        sx={{ width: "100%" }}
        slotProps={{ textField: { size: "small" } }}
        label="Birthday"
        value={bday.value}
        onChange={setBday}
      />
      {/* <TextField
        variant="outlined"
        label="Contact"
        fullWidth
        size="small"
        name="contact"
        value={formik.values.contact}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.contact && formik.errors.contact}
        error={formik.touched.contact && Boolean(formik.errors.contact)}
      /> */}
      {/* <TextField
        variant="outlined"
        label="Birthday"
        fullWidth
        size="small"
        name="bday"
        value={formik.values.bday}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.bday && formik.errors.bday}
        error={formik.touched.bday && Boolean(formik.errors.bday)}
      /> */}

      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" onClick={() => formik.handleSubmit()}>
          Update
        </Button>
      </Stack>
    </Stack>
  );
}

export default ManageUsersForm;
