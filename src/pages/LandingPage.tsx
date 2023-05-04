import React, { FormEvent, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
``;
import AlbumCard from "@/components/AlbumCard";
import { retrieveAlbumByName, retrieveAlbumById } from "@/utils/lastfm";

const LandingPage: React.FC = () => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumId, setCurrentAlbumId] = useState<String>("");
  const [loading, setLoading] = useState(false);
  const albumInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAlbum("homework");
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (albumInput.current) {
      loadAlbum(albumInput.current.value);
    }
  };

  const loadAlbum = async (input: string) => {
    setLoading(true);
    let queriedAlbum = await retrieveAlbumByName(input);

    if (queriedAlbum) {
      const albumData = await retrieveAlbumById(queriedAlbum.mbid);
      setCurrentAlbum(albumData);
      setCurrentAlbumId(queriedAlbum.mbid);
    } else {
      setCurrentAlbum(null);
      setCurrentAlbumId("");
    }
    setLoading(false);
  };

  return (
    <section className=" relative bg-slate-800">
      <div className="max-w-[1300px] m-auto">
        <Navbar />
        <div className="mx-4  flex max-w-3xl flex-col pt-2 pb-20 md:mx-auto  ">
          <h3 className="font-poppins text-3xl text-white ">Enter Album:</h3>
          <form onSubmit={(e) => handleSubmit(e)} className="flex-1 ">
            <div className="relative z-[1] flex items-center rounded-xl border-slate-900 bg-slate-400 p-2">
              <input
                type="text"
                ref={albumInput}
                className=" h-[80%] w-[100%] rounded-lg bg-slate-400 bg-search bg-contain bg-no-repeat  p-2 pl-14 text-xl focus:outline-none focus:ring focus:ring-primary"
              />
              <button className="absolute right-0 rounded-r-lg bg-slate-700 p-4 text-slate-100  hover:bg-slate-500">
                Search
              </button>
            </div>
          </form>
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
