import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const AlbumCard = ({ currentAlbum, currentAlbumId }: any) => {
  const [showTracklist, setShowTracklist] = useState<boolean>(false);
  const router = useRouter();

  const returnTracklist = () => {
    if (currentAlbum?.tracks) {
      return (
        <div className="flex justify-between">
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
    <div className="relative flex flex-1 items-center justify-center">
      <div className="z-[5] my-10 w-full rounded-lg bg-slate-700 p-4 text-slate-100 drop-shadow-lg">
        <div className="flex justify-between">
          <Link className="w-10" href={`/album/${currentAlbumId}`}>
            <h1 className="text-3xl">{currentAlbum?.name}</h1>
          </Link>
          <h2 className="text-2xl">{currentAlbum?.artist}</h2>
        </div>
        <div className="mt-10 flex gap-6 text-lg ">
          {currentAlbum && (
            <Image
              src={`${currentAlbum?.image[2]["#text"]}`}
              alt="album picture"
              width={200}
              height={200}
              className="w-[200px] h-[200px] pointer"
              onClick={() => {
                router.push(`/album/${currentAlbumId}`);
              }}
            />
          )}
          <div className="">
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
              className="relative box-border w-full cursor-pointer  border-gray-600 bg-black p-2 "
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
                        className="flex w-full justify-between  border-gray-600 bg-black p-2 "
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
