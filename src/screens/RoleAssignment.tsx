import { Skeleton, Stack, Typography } from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import { RoleUserItem } from "../components";
import { useGetUsersQuery } from "../api/userApiSlice";

function RoleAssignment() {
  const user = useGetUsersQuery({
    name: "",
  });

  return (
    <>
      <PageSection
        title="Manage Roles"
        primaryTypographyProps={{ fontSize: 32 }}
      >
        <Typography>Assign or modify roles of users</Typography>
      </PageSection>

      <PageSection title="Administrators" marginTop={8}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {!user.isLoading && user.data ? (
            <>
              {user.data.data
                .filter((item) => item.role === 2)
                .map((item) => (
                  <RoleUserItem
                    key={item.id}
                    name={`${item.fname} ${item.lname}`}
                    email={item.email}
                  />
                ))}
            </>
          ) : (
            <>
              <Skeleton width={150} />
              <Skeleton width={150} />
              <Skeleton width={150} />
            </>
          )}
        </Stack>
      </PageSection>
      <PageSection title="Project Managers" marginTop={8}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {!user.isLoading && user.data ? (
            <>
              {user.data.data
                .filter((item) => item.role === 1)
                .map((item) => (
                  <RoleUserItem
                    key={item.id}
                    name={`${item.fname} ${item.lname}`}
                    email={item.email}
                  />
                ))}
            </>
          ) : (
            <>
              <Skeleton width={150} />
              <Skeleton width={150} />
              <Skeleton width={150} />
            </>
          )}
        </Stack>
      </PageSection>
      <PageSection title="Developers" marginTop={8}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {!user.isLoading && user.data ? (
            <>
              {user.data.data
                .filter((item) => item.role === 0)
                .map((item) => (
                  <RoleUserItem
                    key={item.id}
                    name={`${item.fname} ${item.lname}`}
                    email={item.email}
                  />
                ))}
            </>
          ) : (
            <>
              <Skeleton width={150} />
              <Skeleton width={150} />
              <Skeleton width={150} />
            </>
          )}
        </Stack>
      </PageSection>
    </>
  );
}

export default RoleAssignment;
