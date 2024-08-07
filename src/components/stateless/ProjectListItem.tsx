import {
  Box,
  ListItemButton,
  ListItemButtonProps,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = ListItemButtonProps & {
  data: {
    id: string;
    title: string;
    desc: string;
    manager: string;
  };
  includeDescr?: boolean;
  itemDisabled?: boolean;
};

function ProjectListItem({
  includeDescr,
  itemDisabled,
  data,
  ...props
}: Props) {
  const navigate = useNavigate();

  const handleOnClick = () => navigate(`/project/${data.id}`);

  return (
    <ListItemButton
      {...props}
      onClick={handleOnClick}
      disabled={itemDisabled}
      sx={{ height: 56 }}
    >
      <Box width="100%" py={1}>
        <Stack direction="row" justifyContent="space-between">
          <Box flex={1}>
            <Typography variant="body2" fontSize="small">
              {data.title}
            </Typography>
          </Box>
          {includeDescr && (
            <Box display={{ xs: "none", md: "block" }} flex={2}>
              <Typography variant="body2" fontSize="small">
                {data.desc.length >= 80
                  ? data.desc.slice(0, 80) + "..."
                  : data.desc}
              </Typography>
            </Box>
          )}
          <Box flex={1}>
            <Typography variant="body2" fontSize="small">
              {data.manager}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </ListItemButton>
  );
}

export default ProjectListItem;
