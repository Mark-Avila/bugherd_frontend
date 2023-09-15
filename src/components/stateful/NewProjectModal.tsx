import { Close, AssignmentInd, CheckCircle } from "@mui/icons-material";
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
  Tooltip,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, ChangeEvent } from "react";
import { useDebounce, useSet, useSnackError } from "../../hooks";
import { useGetUsersQuery } from "../../api/userApiSlice";
import { Project, ProjectAssign, ResponseBody, User } from "../../types";
import { useCreateProjectMutation } from "../../api/projectApiSlice";
import { useSnackbar } from "notistack";
import { useCreateProjectAssignMutation } from "../../api/projectAssignApiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ModalWrapper } from "..";
import ProjectDetailsForms from "../stateless/ProjectDetailsForm";

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
  open: boolean;
  onClose: VoidFunction;
}

/**
 * Modal UI component for creating a new project
 * @prop {VoidFunction} onClose Function to execute when the "close"
 */
function NewProjectModal({ onClose, open }: Props) {
  //Assigned users
  const assigned = useSet<User>([]);

  //User assigned as leader (Project manager)
  const [leader, setLeader] = useState("");

  //Search string used for searching users
  const [search, setSearch] = useState<string>("");

  //Debouce value of search to reduce search queries
  const debouncedSearch = useDebounce(search, 500);

  //RTK query's and mutations
  const users = useGetUsersQuery({
    name: debouncedSearch,
  });

  const [createProject] = useCreateProjectMutation();
  const [createProjectAssign] = useCreateProjectAssignMutation();

  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload: Project = {
        title: values.title,
        descr: values.description,
        user_id: leader,
        num: assigned.size,
      };

      let createdProjectId: number | undefined;

      try {
        const response: ResponseBody<ProjectAssign[]> = await createProject(
          payload
        ).unwrap();

        if (response.success) {
          //Retrieve the newly created project's ID
          createdProjectId = response.data[0].id!;
          enqueueSnackbar(response.message);
        }
      } catch (err: unknown) {
        snackbarError(err as FetchBaseQueryError);
      }

      for (let i = 0; i < assigned.size; i++) {
        if (createdProjectId !== undefined) {
          try {
            await createProjectAssign({
              user_id: assigned.values[i].id!,
              project_id: createdProjectId,
            });
          } catch (err) {
            snackbarError(err as FetchBaseQueryError);
          }
        }
      }

      //Close modal
      onClose();
    },
  });

  const handleAddToAssigned = (user: User) => {
    assigned.add(user);
  };

  const handleRemoveFromAssigned = (user: User) => {
    assigned.remove(user);
  };

  const handleToggleLeader = (userId: string) => {
    setLeader((prevLeader) => (prevLeader === userId ? "" : userId));
  };

  const handleSubmit = async () => {
    // Form submission logic...
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
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
            <ProjectDetailsForms
              formik={formik}
              assigned={assigned.values}
              leader={leader}
              handleRemoveFromAssigned={handleRemoveFromAssigned}
              handleToggleLeader={handleToggleLeader}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack spacing={2} height="100%">
              <Typography fontSize={12}>Assign members</Typography>
              <TextField
                value={search}
                onChange={handleSearch}
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
                {!users.isLoading && users.isSuccess && (
                  <List>
                    {users.data.data.map((user: User, index) => (
                      <ListItemButton
                        onClick={() => assigned.add(user)}
                        key={index + 100}
                        divider
                      >
                        <ListItemText
                          primaryTypographyProps={{ fontSize: 12 }}
                          primary={`${user.fname} ${user.lname}`}
                        />
                        {assigned.has(user) && (
                          <ListItemSecondaryAction>
                            <CheckCircle color="success" />
                          </ListItemSecondaryAction>
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </Paper>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={() => formik.handleSubmit()} variant="contained">
            SUBMIT
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
}

export default NewProjectModal;
