import { Breadcrumbs, Link } from "@mui/material";
import { BreadItem } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  items: BreadItem[];
}

function PageBreadcrumbs({ items }: Props) {
  const navigate = useNavigate();

  const handleOnItemClick = (to: string) => {
    navigate(to);
  };

  return (
    <Breadcrumbs sx={{ mb: 2 }}>
      {items.map((item, index) => (
        <Link
          key={index}
          underline="hover"
          fontSize="small"
          color="inherit"
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
