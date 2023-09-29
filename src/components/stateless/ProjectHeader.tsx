import { Box, Typography } from "@mui/material";

function ProjectHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography mt={1} color="text.secondary" fontWeight="bold">
        Description
      </Typography>
      <Typography mt={1} fontSize="small" color="text.secondary">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus
        non, excepturi, eius vel rerum odio cupiditate ut molestias distinctio
        optio, consequuntur similique ducimus. Libero magnam cumque
        necessitatibus labore est. Architecto?
      </Typography>
    </Box>
  );
}

export default ProjectHeader;
