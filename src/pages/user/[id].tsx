import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RedirectToSignIn, SignedOut, useAuth, useUser } from "@clerk/nextjs";
import Star from "public/star.svg";
import { retrieveAlbumById, retrieveAlbumByName } from "@/utils/lastfm";
import StarRating from "@/components/StarRating";
import Navbar from "@/components/Navbar";
const UserPage = ({ userId, userInfo, albumDataArray }: any) => {
  const [userReviews, setUserReviews] = useState(userInfo.reviews);
  const [albumsData, setAlbumsData]: any[] = useState(albumDataArray);
  const userObj = useUser();
  const { user } = userObj;

  useEffect(() => {
    verifyUser();
    console.log(userReviews);
  }, [userObj]);

  const getReviewAssets = async () => {
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
    setUserReviews(userInfo.reviews);
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

    const albumData = await Promise.all(promises);
    setAlbumsData(albumData);
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

  const handleDelete = async (index: number) => {
    const idTodelete = userReviews[index].id;
    console.log(idTodelete);
    await deleteReview(idTodelete);
    await getReviewAssets();
  };

  const deleteReview = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-review/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleRatingClick = (index: number) => {};

  return (
    <section className=" relative min-h-screen bg-slate-800">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className=" m-auto max-w-[1300px]">
        <Navbar />
        <div className="  m-auto w-[300px] justify-between  p-10">
          <div className="flex flex-col items-center gap-5 ">
            {user && (
              <Image
                src={`${user?.profileImageUrl}`}
                alt=""
                width={200}
                height={200}
                className="h-[200px] w-[200px] rounded-full"
              />
            )}
            <p className="text-3xl text-white "> {user?.fullName}</p>
          </div>
        </div>
        <div className="pb-4">
          {userReviews.map((review: any, index: number) => (
            <div
              key={review.id}
              className="flex justify-between  border-b-2 border-slate-700  bg-slate-500 text-black"
            >
              {albumsData[index] && (
                <div className="flex  w-[50%]">
                  <Image
                    src={albumsData[index]?.image[2]["#text"]}
                    width={200}
                    className="h-[200px] w-[200px]"
                    height={200}
                    alt="Album Cover"
                  />
                  <div className="flex flex-col justify-center p-5">
                    <h1 className="text-4xl font-bold">
                      {albumsData[index].name}
                    </h1>
                    <h2 className=" text-3xl ">{albumsData[index].artist}</h2>
                  </div>
                </div>
              )}
              <div className="flex w-[50%] justify-between bg-slate-900 p-5">
                <div className=" ">
                  <p className="m-auto h-20 overflow-y-scroll text-white ">
                    {review.content}
                  </p>
                  <div className="">
                    <StarRating
                      rating={review.rating}
                      handleClick={handleRatingClick}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className=" flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-slate-800"
                >
                  <Image
                    src={"/trash-solid.svg"}
                    width={20}
                    height={20}
                    alt="trash can image"
                  ></Image>
                </button>
              </div>
            </div>
          ))}
        </div>
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

  return { props: { userId, userInfo, albumDataArray } };
}

export default UserPage;
