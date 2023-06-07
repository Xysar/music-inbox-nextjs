import React, { useRef, useState } from "react";
import Navbar from "@/components/Navbar";

import { useUser } from "@clerk/nextjs";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import { useRouter } from "next/router";
const CreateReview: React.FC = () => {
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentAlbumId, setCurrentAlbumId] = useState<String>("");
  const [rating, setRating] = useState(-1);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const router = useRouter();

  const userObj = useUser();
  const { user } = userObj;

  const reviewInput = useRef<HTMLTextAreaElement>(null);

  const handleRatingClick = (index: number) => {
    setRating(index);
  };

  const verifyAlbum = async () => {
    if (!currentAlbum) {
      setError(true);
      return;
    }

    setError(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-album`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: currentAlbum.name,
          artist: currentAlbum.artist,
          mbid: currentAlbumId,
        }),
      }
    );

    const results = await response.json();
  };

  const createReview = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${currentAlbumId}/${user?.id}/create-review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: reviewInput.current?.value,
          rating: rating,
        }),
      }
    );
  };

  const handleSubmit = async () => {
    if (rating < 0) {
      return;
    }
    await verifyAlbum();
    await createReview();
    router.push(`/user/${user?.id}`);
  };

  return (
    <section className=" min-h-screen bg-slate-800">
      <div className="m-auto max-w-[1300px]">
        <Navbar />
        <div className="m-10">
          <SearchBar
            setCurrentAlbum={setCurrentAlbum}
            setCurrentAlbumId={setCurrentAlbumId}
            setLoading={setLoading}
          />
        </div>
        <div className="flex flex-col items-center justify-evenly md:flex-row ">
          <div className=" ">
            {loading ? (
              <div className="text-3xl text-white">Loading...</div>
            ) : currentAlbum ? (
              <div className=" bg-slate-900 text-slate-100">
                <div className="max-w-[300px] px-4 pt-4">
                  <h1 className=" mb-1 text-3xl font-bold text-white ">
                    {currentAlbum?.name}
                  </h1>
                  <h2 className=" mb-4 text-2xl font-bold text-gray-300">
                    {currentAlbum?.artist}
                  </h2>
                </div>
                {currentAlbum && (
                  <Image
                    src={`${currentAlbum?.image[2]["#text"]}`}
                    alt="album picture"
                    width={200}
                    height={200}
                    className="h-[300px] w-[300px] "
                  />
                )}
              </div>
            ) : (
              <div className="w-[300px] bg-slate-900 text-slate-100">
                <p className="p-6 text-3xl">Enter an album to be reviewed</p>
              </div>
            )}
          </div>

          <form className="max-w-[600px] flex-1 py-12 text-slate-100">
            <div className=" mx-2 mb-5">
              <label className="text-2xl" htmlFor="review">
                Write Review Here:
              </label>
              <textarea
                required
                ref={reviewInput}
                className="h-32 w-full rounded-md bg-slate-100 p-3 text-lg text-black"
              ></textarea>
            </div>
            <div className="mb-10 flex justify-center">
              <StarRating rating={rating} handleClick={handleRatingClick} />
            </div>
            <button
              className="m-auto block rounded-lg bg-primary p-3 text-lg duration-300 ease-in-out  hover:bg-slate-900"
              type="button"
              onClick={() => handleSubmit()}
            >
              {" "}
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateReview;
