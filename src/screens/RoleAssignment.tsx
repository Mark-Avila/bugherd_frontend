import { Skeleton, Stack, Typography } from "@mui/material";
import PageSection from "../components/stateless/PageSection";
import { RoleUserItem } from "../components";
import { useGetUsersQuery } from "../api/userApiSlice";

const SKELETON_WIDTH = 250;
const SKELETON_HEIGHT = 110;

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
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
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
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
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
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
              <Skeleton width={SKELETON_WIDTH} height={SKELETON_HEIGHT} />
            </>
          )}
        </Stack>
      </PageSection>
    </>
  );
}

export default RoleAssignment;
