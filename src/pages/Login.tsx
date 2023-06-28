import React from "react";
import { ClerkProvider, SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div>
      <SignIn
        path="/Login"
        routing="path"
        signUpUrl="/Register"
        afterSignInUrl="/VerifyUser"
      />
    </div>
  );
};

export default Login;
