import { Edit } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  desc: string;
  onEditClick: VoidFunction;
  archived?: boolean;
}

function ProjectHeader({ title, desc, archived, onEditClick }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Typography variant="h4">{title}</Typography>
        <IconButton onClick={onEditClick}>
          <Edit />
        </IconButton>
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
