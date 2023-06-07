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

  return (
    <section className="relative min-h-screen bg-slate-800">
      <div className="m-auto max-w-[1300px]">
        <Navbar />
        <div className="mx-4 flex flex-col pb-20 pt-4 xl:mx-auto">
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
              showLink={true}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
