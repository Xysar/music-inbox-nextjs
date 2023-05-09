import React, { FormEvent, useEffect, useRef, useState } from "react";

import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import AlbumCard from "@/components/AlbumCard";
import { retrieveAlbumByName, retrieveAlbumById } from "@/utils/lastfm";
import SearchBar from "@/components/SearchBar";

const LandingPage: React.FC = () => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumId, setCurrentAlbumId] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const userObj = useUser();
  const { user } = userObj;

  useEffect(() => {
    verifyUser();
  }, [userObj]);

  const verifyUser = async () => {
    if (!user) {
      return;
    }
    const { fullName, id } = user;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fullName,
          clerkId: id,
        }),
      }
    );
    const result = await response.json();
  };

  return (
    <section className="relative min-h-screen bg-slate-800">
      <div className="m-auto max-w-[1300px]">
        <Navbar />
        <div className="mx-4 flex max-w-3xl flex-col pb-20 pt-2 md:mx-auto">
          <SearchBar
            setCurrentAlbum={setCurrentAlbum}
            setCurrentAlbumId={setCurrentAlbumId}
            setLoading={setLoading}
          />
          {loading ? (
            <div className="text-3xl text-white">Loading...</div>
          ) : (
            <AlbumCard
              currentAlbum={currentAlbum}
              currentAlbumId={currentAlbumId}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
