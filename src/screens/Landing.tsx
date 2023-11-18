import { useEffect, useState } from "react";
import { SignIn, SignUp } from "./";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function Landing() {
  const [screen, setScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleScreen = () => setScreen(!screen);

  useEffect(() => {
    if (auth.user) {
      navigate("/dashboard");
      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {screen ? (
        <SignIn handleScreen={handleScreen} />
      ) : (
        <SignUp handleScreen={handleScreen} />
      )}
    </>
  );
}

export default Landing;
