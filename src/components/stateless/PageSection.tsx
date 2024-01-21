import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

type Props = BoxProps & {
  title?: string;
  children?: ReactNode;
  action?: JSX.Element;
  primaryTypographyProps?: TypographyProps;
};

// interface Props extends BoxProps {
//   title: string;
//   children: ReactNode;
//   action?: JSX.Element;
// }

function PageSection({
  title,
  children,
  action,
  primaryTypographyProps,
  ...props
}: Props) {
  return (
    <Box {...props}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        {title && (
          <Typography variant="h6" {...primaryTypographyProps}>
            {title}
          </Typography>
        )}
        {action || null}
      </Box>
      {children && children}
    </Box>
  );
}

export default PageSection;
