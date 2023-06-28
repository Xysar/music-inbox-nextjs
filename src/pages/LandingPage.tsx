import React, { FormEvent, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import Navbar from "@/components/Navbar";
import { useUser } from "@clerk/nextjs";
import AlbumCard from "@/components/AlbumCard";
import { retrieveAlbumByName, retrieveAlbumById } from "@/utils/lastfm";
import SearchBar from "@/components/SearchBar";
import TopAlbums from "@/components/TopAlbums";
import RandomUsers from "@/components/RandomUsers";
import Footer from "@/components/Footer";

const LandingPage = ({ albums, users }: any) => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumId, setCurrentAlbumId] = useState<String>("");
  const [loading, setLoading] = useState(false);

  const userObj = useUser();
  const { user } = userObj;

  useEffect(() => {
    console.log(albums);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900">
      <div className="m-auto max-w-[1300px]">
        <Navbar />
        <div className="mx-4 flex flex-col pb-10 pt-4 xl:mx-auto">
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
        <div className=" m-auto flex flex-col justify-between gap-10 pb-20 md:flex-row">
          <TopAlbums albums={albums} />
          <RandomUsers users={users} />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LandingPage;
