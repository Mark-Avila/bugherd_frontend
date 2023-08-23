import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  action?: JSX.Element;
}

function PageSection({ title, children, action }: Props) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        <Typography variant="h6">{title}</Typography>
        {action || null}
      </Box>
      {children}
    </>
  );
}

export default PageSection;
