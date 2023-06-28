import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
const UpdateUser = () => {
  const router = useRouter();
  const userObj = useUser();
  const { user } = userObj;

  useEffect(() => {
    if (!user) {
      return;
    }
    updateUser();
    router.push("/");
  }, [userObj]);

  const updateUser = async () => {
    if (!user) {
      return;
    }
    const { fullName, id, imageUrl } = user;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-user`,
      {
        method: "PUT",
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

export default UpdateUser;
