import { Close, KeyboardArrowRight } from "@mui/icons-material";
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
  ListItemButton,
  ListItemSecondaryAction,
  ListItem,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

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

function NewProjectModal({ onClose }: Props) {
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
              <List>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: 12, color: "primary" }}
                    primary="Mark Christian Avila (Leader)"
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <Close />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: 12 }}
                    primary="Mark Christian Avila"
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <Close />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ fontSize: 12 }}
                    primary="Mark Christian Avila"
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <Close />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </List>
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
