import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = BoxProps & {
  title: string;
  children: ReactNode;
  action?: JSX.Element;
};

// interface Props extends BoxProps {
//   title: string;
//   children: ReactNode;
//   action?: JSX.Element;
// }

function PageSection({ title, children, action, ...props }: Props) {
  return (
    <Box {...props}>
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
    </Box>
  );
}

export default PageSection;
