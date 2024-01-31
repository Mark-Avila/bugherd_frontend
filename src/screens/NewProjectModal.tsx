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
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { useDebounce, useSnackError } from "../hooks";
import { useGetUsersQuery } from "../api/userApiSlice";
import { Project, ProjectAssign, ResponseBody, User } from "../types";
import {
  useCreateProjectMutation,
  useLazyGetCurrentProjectQuery,
} from "../api/projectApiSlice";
import { useSnackbar } from "notistack";
import { useCreateProjectAssignMutation } from "../api/projectAssignApiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import {
  SelectMembers,
  LoadingScreen,
  ProjectDetailsForms,
  ModalWrapper,
} from "../components";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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
  const [assigned, setAssigned] = useState<User[]>([] as User[]);

  const auth = useSelector((state: RootState) => state.auth);

  //User assigned as leader (Project manager)
  const [leader, setLeader] = useState<number>(0);

  //Search string used for searching users
  const [search, setSearch] = useState<string>("");

  //Debouce value of search to reduce search queries
  const debouncedSearch = useDebounce(search, 500);

  //RTK query's and mutations
  const users = useGetUsersQuery({
    name: debouncedSearch,
  });

  const isMountedRef = useRef(true);

  const [createProject] = useCreateProjectMutation();
  const [createProjectAssign] = useCreateProjectAssignMutation();
  const [updateProjectData] = useLazyGetCurrentProjectQuery();

  const { enqueueSnackbar } = useSnackbar();
  const { snackbarError } = useSnackError();

  useEffect(() => {
    /**
     * Prevents the useEffect from running twice
     * onmount with strictmode on during development
     */
    if (
      import.meta.env.VITE_ENV === "dev" &&
      isMountedRef.current &&
      auth &&
      auth.user
    ) {
      handleAddToAssigned(auth.user);
      setLeader(auth.user.id as number);
    } else if (!import.meta.env.VITE_ENV && auth && auth.user) {
      handleAddToAssigned(auth.user);
      setLeader(auth.user.id as number);
    }
  }, []);

  useEffect(() => {
    // Set the flag to false when the component is unmounted
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
        num: assigned.length,
      };

      let createdProjectId: number | undefined;

      try {
        const response: ResponseBody<ProjectAssign[]> = await createProject(
          payload
        ).unwrap();

        if (response.success) {
          createdProjectId = response.data[0].id!;
          enqueueSnackbar("Successfully created new project", {
            variant: "success",
          });
        }
      } catch (err: unknown) {
        snackbarError(err as FetchBaseQueryError);
      }

      for (let i = 0; i < assigned.length; i++) {
        if (createdProjectId !== undefined) {
          try {
            await createProjectAssign({
              user_id: assigned[i].id as number,
              project_id: createdProjectId,
            });
          } catch (err) {
            snackbarError(err as FetchBaseQueryError);
          }
        }
      }

      updateProjectData();
      onClose();
    },
  });

  const handleAddToAssigned = (user: User) => {
    if (!handleIsAssigned(user.id as number)) {
      setAssigned((prev) => [...prev, user]);
    } else {
      handleRemoveFromAssigned(user.id as number);
    }
  };

  const handleRemoveFromAssigned = (user_id: number) => {
    setAssigned((prev) => prev.filter((user) => user.id !== user_id));
  };

  const handleToggleLeader = (userId: number) => {
    setLeader((prevLeader) => (prevLeader === userId ? 0 : userId));
  };

  const handleIsAssigned = (targetId: number) =>
    assigned.some((user) => user.id === targetId);

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
            {users.data && (
              <ProjectDetailsForms
                formik={formik}
                assigned={assigned}
                leader={leader}
                handleRemoveFromAssigned={handleRemoveFromAssigned}
                handleToggleLeader={handleToggleLeader}
              />
            )}
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
