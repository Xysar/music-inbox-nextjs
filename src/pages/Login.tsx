import React from "react";
import { ClerkProvider, SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div>
      <SignIn
        path="/Login"
        routing="path"
        signUpUrl="/Register"
        afterSignInUrl="/UpdateUser"
      />
    </div>
  );
};

export default Login;
