import { Box, Typography } from "@mui/material";

function ProjectHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Kikoo weather services</Typography>
      <Typography fontSize={12} mt={1} color="text.secondary" fontWeight="bold">
        Description
      </Typography>
      <Typography fontSize={12} color="text.secondary">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus
        non, excepturi, eius vel rerum odio cupiditate ut molestias distinctio
        optio, consequuntur similique ducimus. Libero magnam cumque
        necessitatibus labore est. Architecto?
      </Typography>
    </Box>
  );
}

export default ProjectHeader;
