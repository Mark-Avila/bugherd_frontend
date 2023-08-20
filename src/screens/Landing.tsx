import { useState } from "react";
import { SignIn, SignUp } from "./";

function Landing() {
  const [screen, setScreen] = useState(true);

  const handleScreen = () => setScreen(!screen);

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
