import React, { useRef, useEffect } from "react";
import { retrieveAlbumById, retrieveAlbumByName } from "@/utils/lastfm";
const SearchBar = ({ setCurrentAlbum, setCurrentAlbumId, setLoading }: any) => {
  const albumInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAlbum("Discovery");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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
    <section className="bg-slate-900">
      <div className="m-auto max-w-[1300px]">
        <h3 className="font-poppins text-3xl text-white ">Enter Album:</h3>
        <form onSubmit={(e) => handleSubmit(e)} className="flex-1 ">
          <div className="z-[1] flex">
            <input
              type="text"
              ref={albumInput}
              className=" bg-search box-border w-full rounded-l-lg  border bg-slate-400 bg-contain bg-no-repeat p-4  pl-14 text-xl focus:border focus:border-primary focus:outline-none "
            />
            <button className="  rounded-r-lg bg-slate-800 p-4 text-slate-100  hover:bg-slate-500">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
