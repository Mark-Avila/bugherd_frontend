import { Box, Typography } from "@mui/material";

interface Props {
  desc: string;
}

function ProjectHeader({ desc }: Props) {
  return (
    <Box sx={{ width: "100%" }}>
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
