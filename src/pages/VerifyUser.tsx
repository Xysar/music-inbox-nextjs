import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
const VerifyUser = () => {
  const router = useRouter();
  const userObj = useUser();
  const { user } = userObj;

  useEffect(() => {
    if (!user) {
      return;
    }
    verifyUser();
    router.push("/");
  }, [userObj]);

  const verifyUser = async () => {
    if (!user) {
      return;
    }
    const { fullName, id, imageUrl } = user;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fullName,
          imageId: imageUrl,
          clerkId: id,
        }),
      }
    );
  };

  return <div></div>;
};

export default VerifyUser;
