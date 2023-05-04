import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Collection = () => {
  const auth = useAuth();

  return <div>Collection</div>;
};

export default Collection;
