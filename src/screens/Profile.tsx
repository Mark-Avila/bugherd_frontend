import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import {
  ModalWrapper,
  ProfileInfo,
  ProjectList,
  TicketList,
} from "../components";
import PageSection from "../components/stateless/PageSection";
import { useLazyGetTicketsOfCurrentUserQuery } from "../api/ticketApiSlice";
import { useGetCurrentProjectQuery } from "../api/projectApiSlice";
import { ProjectWithUser } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setBreadcrumbs } from "../slices/breadSlice";
import { Edit, FileUploadOutlined } from "@mui/icons-material";
import pictureApi from "../api/userPictureApi";
import { useSnackbar } from "notistack";
import { useSnackError } from "../hooks";

interface Props {
  viewMode?: "tickets" | "projects";
}

/**
 * TODO: Upload profile picture UI
 */

function Profile({ viewMode }: Props) {
  const [getTickets, tickets] = useLazyGetTicketsOfCurrentUserQuery();
  const projects = useGetCurrentProjectQuery();
  const { user } = useSelector((state: RootState) => state.auth);

  const [userPicture, setUserPicture] = useState<string>();

  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<string | undefined>();
  const [previewFileName, setPreviewFileName] = useState<string | null>(null);
  const [hasPicture, setHasPicture] = useState<boolean>(false);

  //Ticket Pagination
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const TICKET_LIMIT = 5;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (user) {
      getTickets({ limit: TICKET_LIMIT, offset: 0 })
        .unwrap()
        .then((res) => {
          const pages: number = (res.count as number) / TICKET_LIMIT;
          setMaxPage(Math.round(pages));
        });
    }
  }, []);

  useEffect(() => {
    const fetchUserPicture = async () => {
      if (user) {
        const userPictureData: string | null =
          await pictureApi.fetchUserPicture(user.id!.toString());
        if (userPictureData !== null) {
          setUserPicture(userPictureData);
          setPreviewFile(userPictureData);
          setHasPicture(true);
        }
      }
    };

    fetchUserPicture();
  }, []);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value <= maxPage && value >= 0) {
      setCurrPage(value);
      getTickets({ offset: (value - 1) * TICKET_LIMIT, limit: TICKET_LIMIT });
    }
  };

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: user ? `${user.fname} ${user.lname}` : "...",
          to: "/profile",
        },
      ])
    );
  }, [user]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setSelectedFile(selectedFile);

    if (selectedFile) {
      // Preview the image (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFile(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setPreviewFileName(selectedFile.name);
    }
  };

  const uploadFile = async (file: File) => {
    if (user) {
      try {
        let result: boolean;

        if (hasPicture) {
          result = await pictureApi.updateUserPicture(
            file,
            (user.id as number).toString()
          );
        } else {
          result = await pictureApi.uploadUserPicture(
            file,
            (user.id as number).toString()
          );
        }

        if (result) {
          enqueueSnackbar("Succesfully upload profile picture", {
            variant: "success",
          });

          closeUploadModal();
        } else {
          enqueueSnackbar("Failed to upload profile picture", {
            variant: "error",
          });
        }
      } catch (err: unknown) {
        enqueueSnackbar("Failed to upload profile picture", {
          variant: "error",
        });
      }
    }
  };

  const handleUploadFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const openUploadModal = () => {
    if (userPicture) {
      setPreviewFile(userPicture);
    }

    setUploadModal(true);
  };

  const closeUploadModal = () => {
    setPreviewFile(undefined);
    setSelectedFile(null);
    setUploadModal(false);
  };

  return (
    <>
      <ModalWrapper
        title="Upload Profile Picture"
        open={uploadModal}
        onClose={closeUploadModal}
        action={<Button onClick={handleUploadFile}>Upload</Button>}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={3}
        >
          <Avatar sx={{ height: "96px", width: "96px" }} src={previewFile} />
          <TextField
            variant="standard"
            type="text"
            value={previewFileName || ""}
            placeholder="Please upload an image"
            InputProps={{
              endAdornment: (
                <IconButton component="label">
                  <FileUploadOutlined />
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                    hidden
                  />
                </IconButton>
              ),
            }}
          />
        </Stack>
      </ModalWrapper>
      <Stack width="100%" direction="column">
        <Grid container width="100%" spacing={2}>
          {!viewMode && (
            <Grid item lg={4}>
              <PageSection title="User Details" width="100%">
                <ProfileInfo
                  user={user}
                  onProfileClick={openUploadModal}
                  userPictureSrc={userPicture}
                />
              </PageSection>
            </Grid>
          )}
          <Grid item lg={viewMode ? 12 : 8}>
            <Stack spacing={4}>
              {(!viewMode || viewMode === "projects") && (
                <PageSection title="Projects Assigned">
                  <ProjectList
                    projects={
                      projects.data && (projects.data.data as ProjectWithUser[])
                    }
                  />
                </PageSection>
              )}
              {(!viewMode || viewMode === "tickets") && (
                <PageSection title="Tickets created">
                  {<TicketList tickets={tickets.data && tickets.data.data} />}
                  <Box mt={2}>
                    <Pagination
                      count={maxPage}
                      onChange={handlePagination}
                      page={currPage}
                    />
                  </Box>
                </PageSection>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default Profile;
