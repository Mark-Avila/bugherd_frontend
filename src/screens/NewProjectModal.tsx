import { Close } from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState, ChangeEvent } from "react";
import { useDebounce, useSet, useSnackError } from "../hooks";
import { useGetUsersQuery } from "../api/userApiSlice";
import { Project, ProjectAssign, ResponseBody, User } from "../types";
import { useCreateProjectMutation } from "../api/projectApiSlice";
import { useSnackbar } from "notistack";
import { useCreateProjectAssignMutation } from "../api/projectAssignApiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import {
  SelectMembers,
  LoadingScreen,
  ProjectDetailsForms,
  ModalWrapper,
} from "../components";

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

  const handleIsAssigned = (user: User) => assigned.has(user);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        overflow="auto"
        bgcolor="background.paper"
        padding={2}
        boxShadow={24}
        borderRadius={1}
        width={{
          xs: "95%",
          lg: 700,
        }}
        height={{
          lg: 500,
        }}
        mx={{
          xs: 1,
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
            {users.isSuccess && users.data ? (
              <SelectMembers
                search={search}
                users={users.data.data}
                handleSearch={handleSearch}
                handleIsAssigned={handleIsAssigned}
                handleAddAssigned={handleAddToAssigned}
              />
            ) : (
              <LoadingScreen />
            )}
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
