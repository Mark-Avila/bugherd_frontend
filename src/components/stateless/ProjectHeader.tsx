import { Edit } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  title?: string;
  desc?: string;
  onEditClick: VoidFunction;
  archived?: boolean;
}

function ProjectHeader({ title, desc, archived, onEditClick }: Props) {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Typography variant="h4">{title}</Typography>
        {user && user.role >= 1 && <IconButton onClick={onEditClick} disabled={archived}>
          <Edit />
        </IconButton>}
        {archived && (
          <Tooltip title="This project has been archived">
            <Chip label="Archived" color="warning" />
          </Tooltip>
        )}
      </Stack>
      <Typography mt={1} color="text.secondary" fontWeight="bold">
        Description
      </Typography>
      <Typography mt={1} fontSize="small" color="text.secondary">
        {desc}
      </Typography>
    </Box>
  );
}

export default ProjectHeader;
