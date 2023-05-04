import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RedirectToSignIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";
import Star from "public/star.svg";
import { retrieveAlbumById, retrieveAlbumByName } from "@/utils/lastfm";
import StarRating from "@/components/StarRating";
import Navbar from "@/components/Navbar";
const UserPage = ({ userId, userInfo }: any) => {
  const userObj = useUser();
  const { user } = userObj;

  const [userReviews, setUserReviews] = useState(userInfo.reviews);
  const [albumsData, setAlbumsData]: any[] = useState([]);

  useEffect(() => {
    verifyUser();
  }, [userObj]);

  useEffect(() => {
    getReviewAssets();
  }, []);

  const getReviewAssets = async () => {
    const albumResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-user-album-mbids/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const albumIds = await albumResponse.json();

    const promises = await Promise.all(
      albumIds.map((albumId: string) => retrieveAlbumById(albumId))
    );

    const albumDataArray = await Promise.all(promises);

    console.log(albumDataArray);
    setAlbumsData(albumDataArray);
  };

  const sendReview = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/770b9b80-10e1-4297-b1fd-46ad0dbb0305/${userId}/create-review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "Good Album",
          rating: 5,
        }),
      }
    );
    const results = await response.json();
    console.log(results);
  };

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

  const handleRatingClick = (index: number) => {
    console.log(index);
  };

  return (
    <section className=" relative bg-slate-800">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className=" m-auto max-w-[1300px]">
        <Navbar />
        <div className="  p-10 w-[300px] m-auto  justify-between">
          <div className="items-center flex flex-col gap-5 ">
            {user && (
              <Image
                src={`${user?.profileImageUrl}`}
                alt=""
                width={200}
                height={200}
                className="h-[200px] w-[200px] rounded-full"
              />
            )}
            <p className="text-white text-3xl "> {user?.fullName}</p>
          </div>
        </div>
        {userReviews.map((review: any, index: number) => (
          <div
            key={review.id}
            className="flex  justify-between  text-black bg-slate-500"
          >
            {albumsData[index] && (
              <div className="flex  w-[50%]">
                <Image
                  src={albumsData[index]?.image[2]["#text"]}
                  width={200}
                  height={200}
                  alt="Album Cover"
                />
                <div className="p-5 flex flex-col justify-center">
                  <h1 className=" text-4xl font-bold">
                    {albumsData[index].artist}
                  </h1>
                  <h2 className="text-3xl ">{albumsData[index].name}</h2>
                </div>
              </div>
            )}
            <div className="bg-slate-900 p-5 w-[50%]">
              <p className="overflow-y-scroll h-20 m-auto text-white ">
                {review.content}
              </p>
              <div className="">
                <StarRating
                  rating={review.rating}
                  handleClick={handleRatingClick}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export async function getServerSideProps(context: any) {
  const userId = context.query.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const userInfo = await response.json();

  return { props: { userId, userInfo } };
}

export default UserPage;
