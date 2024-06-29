import { useEffect, useState } from "react";
import { SignIn, SignUp } from "./";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

/**
 * The landing screen, used for conditionally
 * rendering the 'Signin' and 'Signup' screens
 * or redirecting authenticated users
 */
function Landing() {
  // State for handling which screen to render (true for 'Signin' screen)
  const [screen, setScreen] = useState(true);

  // User authentication state
  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleScreen = () => setScreen(!screen);

  useEffect(() => {
    // If user auth state exists, redirect to dashboard
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
