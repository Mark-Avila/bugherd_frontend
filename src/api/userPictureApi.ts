const fetchUserPicture = async (userId: string): Promise<string | null> => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/user/${userId}/picture`,
      {
        credentials: "include",
      }
    );

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      return url;
    } else {
      return null;
    }
  } catch (err: unknown) {
    return null;
  }
};

const pictureApi = {
  fetchUserPicture,
};

export default pictureApi;
