import React from "react";
import { SignUp } from "@clerk/nextjs";

const Register = () => {
  return (
    <div>
      <SignUp
        path="/Register"
        routing="path"
        signInUrl="/Login"
        afterSignUpUrl="/VerifyUser"
        redirectUrl="/VerifyUser"
      />
    </div>
  );
};

export default Register;
