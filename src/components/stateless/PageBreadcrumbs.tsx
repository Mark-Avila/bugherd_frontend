import { Breadcrumbs, Link, useTheme } from "@mui/material";
import { BreadItem } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  items: BreadItem[];
}

function PageBreadcrumbs({ items }: Props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOnItemClick = (to: string) => {
    navigate(to);
  };

  return (
    <Breadcrumbs>
      {items.map((item, index) => (
        <Link
          key={index}
          underline="hover"
          fontSize="small"
          color={theme.palette.text.primary}
          component="button"
          onClick={() => handleOnItemClick(item.to)}
        >
          {item.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export default PageBreadcrumbs;
