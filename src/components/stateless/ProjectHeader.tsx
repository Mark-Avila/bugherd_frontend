import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

function ProjectHeader() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6">Kikoo weather services</Typography>
      <Typography fontSize={12} color={grey[600]}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus
        non, excepturi, eius vel rerum odio cupiditate ut molestias distinctio
        optio, consequuntur similique ducimus. Libero magnam cumque
        necessitatibus labore est. Architecto?
      </Typography>
    </Box>
  );
}

export default ProjectHeader;
