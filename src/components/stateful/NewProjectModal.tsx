import { Close, AssignmentInd } from "@mui/icons-material";
import {
  Stack,
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
  Grid,
  Button,
  Paper,
  List,
  ListItemText,
  ListItemSecondaryAction,
  ListItem,
  ListItemButton,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useSet } from "../../hooks";
import { useGetUsersQuery } from "../../api/userApiSlice";

//TODO: Add select leader option

const validationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Title is too short")
    .max(30, "Title is too long")
    .required("Please enter a title"),
  description: yup
    .string()
    .min(2, "Description is too short")
    .required("Please enter a description"),
});

interface Props {
  onClose: VoidFunction;
}

interface DummyUser {
  id: number;
  fname: string;
  lname: string;
}

const dummyUserData: DummyUser[] = [
  {
    id: 1,
    fname: "Mark",
    lname: "Avila",
  },
  {
    id: 2,
    fname: "Neilmathew",
    lname: "Lacsamana",
  },
  {
    id: 3,
    fname: "Harvey",
    lname: "Alonday",
  },
  {
    id: 4,
    fname: "John Remmon",
    lname: "Castor",
  },
  {
    id: 5,
    fname: "Elie Joy",
    lname: "Grajo",
  },
];

function NewProjectModal({ onClose }: Props) {
  const assigned = useSet<DummyUser>([]);
  const [leader, setLeader] = useState("");

  const { data, isLoading, isError, error, isSuccess } = useGetUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });

  return (
    <Box
      sx={{
        width: {
          xs: "95%",
          lg: 700,
        },
        height: {
          lg: 500,
        },
        mx: {
          xs: 1,
        },
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" ml={2} fontSize="small">
          New Project
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Grid sx={{ flexGrow: 1 }} container spacing={2} mt={1}>
        <Grid item xs={12} lg={6}>
          <Stack spacing={2} height="100%">
            <TextField
              size="small"
              label="Title"
              id="project-title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.title && formik.errors.title}
              error={formik.touched.title && Boolean(formik.errors.title)}
              fullWidth
            />
            <TextField
              size="small"
              label="Description"
              id="project-desc"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched.description && formik.errors.description
              }
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              multiline
              rows={3}
            />

            <Typography fontSize={12}>Assigned</Typography>
            <Paper
              variant="outlined"
              sx={{
                flexGrow: 1,
                overflow: "auto",
                height: "0px",
              }}
            >
              {!isLoading && (
                <List>
                  {assigned.values.map((item, index) => (
                    <ListItem key={index + 100} divider>
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: 12,
                          color: leader === item.id.toString() ? "primary" : "",
                        }}
                        primary={
                          (leader === item.id.toString() ? "(Leader) " : "") +
                          item.fname +
                          " " +
                          item.lname
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() =>
                            setLeader(
                              item.id.toString() === leader
                                ? ""
                                : item.id.toString()
                            )
                          }
                        >
                          <AssignmentInd />
                        </IconButton>
                        <IconButton onClick={() => assigned.remove(item)}>
                          <Close fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Stack spacing={2} height="100%">
            <Typography fontSize={12}>Assign members</Typography>
            <TextField
              variant="filled"
              size="small"
              label="Search"
              id="project-search"
            />
            <Paper
              variant="outlined"
              sx={{
                flexGrow: 1,
                overflow: "auto",
                height: "0px",
              }}
            >
              <List>
                {dummyUserData.map((user, index) => (
                  <ListItemButton
                    onClick={() => assigned.add(user)}
                    key={index + 100}
                    divider
                  >
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 12 }}
                      primary={`${user.fname} ${user.lname}`}
                    />
                  </ListItemButton>
                ))}
                {/* <TempListItem />
                <TempListItem />
                <TempListItem />
                <TempListItem />
                <TempListItem /> */}
              </List>
              {/* <UserList isButton /> */}
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => formik.handleSubmit()} variant="contained">
          SUBMIT
        </Button>
      </Box>
    </Box>
  );
}

export default NewProjectModal;
