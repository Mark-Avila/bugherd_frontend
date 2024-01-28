import {
  Stack,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
} from "@mui/material";
import { FormikProps } from "formik";
import { User } from "../../types";
import { AssignmentInd, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  formik: FormikProps<{
    title: string;
    description: string;
  }>;
  assigned: User[];
  leader: number;
  handleToggleLeader: (user_id: number) => void;
  handleRemoveFromAssigned: (user_id: number) => void;
}

function ProjectDetailsForms({
  formik,
  assigned,
  leader,
  handleToggleLeader,
  handleRemoveFromAssigned,
}: Props) {
  const auth = useSelector((state: RootState) => state.auth);

  return (
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
        helperText={formik.touched.description && formik.errors.description}
        error={formik.touched.description && Boolean(formik.errors.description)}
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
          {assigned.map((user, index) => (
            <ListItem key={index + 100} divider>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: 12,
                  color: leader === user.id ? "primary" : "",
                }}
                primary={
                  (leader === user.id ? "(Leader) " : "") +
                  user.fname +
                  " " +
                  user.lname
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Project Manager">
                  <IconButton
                    onClick={() => handleToggleLeader(user.id as number)}
                  >
                    <AssignmentInd />
                  </IconButton>
                </Tooltip>

                {auth.user ? (
                  auth.user.id !== user.id && (
                    <Tooltip title="Remove from team">
                      <IconButton
                        onClick={() =>
                          handleRemoveFromAssigned(user.id as number)
                        }
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )
                ) : (
                  <></>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
}

export default ProjectDetailsForms;
