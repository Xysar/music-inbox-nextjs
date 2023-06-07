import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const AlbumCard = ({ currentAlbum, currentAlbumId, showLink }: any) => {
  const [showTracklist, setShowTracklist] = useState<boolean>(false);
  const router = useRouter();

  const verifyAlbum = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-album`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: currentAlbum?.name,
          artist: currentAlbum?.artist,
          mbid: currentAlbumId,
        }),
      }
    );
    router.push(`/album/${currentAlbumId}`);
  };

  const returnTracklist = () => {
    if (currentAlbum?.tracks) {
      return (
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <p>1.</p>
            <p>{currentAlbum?.tracks?.track[0].name}</p>
          </div>
          <p className="">
            {convertSecondsToMinutes(currentAlbum?.tracks?.track[0].duration)}
          </p>
        </div>
      );
    } else return <div>No Tracklist Info Found</div>;
  };

  const convertSecondsToMinutes = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let remainingSecondsString =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + remainingSecondsString;
  };

  return (
    <div className="z-[5] my-10 w-full rounded-lg bg-slate-700 p-4 text-slate-100 drop-shadow-lg duration-150 ease-in-out  ">
      <div className="flex justify-between ">
        <h1 className="text-3xl">{currentAlbum?.name}</h1>
        <h2 className="text-2xl">{currentAlbum?.artist}</h2>
      </div>

      {currentAlbum && (
        <div className="mt-10 flex flex-col gap-6 text-lg sm:flex-row">
          <div className="flex-shrink-0">
            <Image
              src={`${currentAlbum?.image[2]["#text"]}`}
              alt="album picture"
              width={200}
              height={200}
              className="aspect-square w-[300px] "
            />
          </div>
          <div className=" flex flex-col justify-between">
            <p
              className="mb-2"
              dangerouslySetInnerHTML={
                currentAlbum?.wiki
                  ? { __html: `${currentAlbum?.wiki.summary}` }
                  : { __html: "" }
              }
            ></p>
            <div
              onClick={() => setShowTracklist((prev) => !prev)}
              className="relative box-border w-full cursor-pointer  border-gray-600 bg-black p-2 hover:bg-slate-900 "
            >
              {returnTracklist()}
              <div
                className={`${
                  showTracklist ? "block" : "hidden"
                } absolute left-0 top-0 h-44 w-[100%] overflow-scroll `}
              >
                {currentAlbum?.tracks?.track.map(
                  (curTrack: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full justify-between  border-gray-600 bg-black p-2 hover:bg-slate-900 "
                      >
                        <div className="flex gap-2">
                          <p>{index + 1}.</p>
                          <p>{curTrack.name}</p>
                        </div>
                        <p className="">
                          {convertSecondsToMinutes(curTrack.duration)}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <button
              className={`${
                showLink ? "" : "hidden"
              } self-end  rounded-lg bg-primary px-8   py-2 text-white duration-150 ease-in-out  hover:scale-110`}
              onClick={() => verifyAlbum()}
            >
              {"Go"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
