import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AlbumCard from "@/components/AlbumCard";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { retrieveAlbumById } from "@/utils/lastfm";
import StarRating from "@/components/StarRating";
import Image from "next/image";

const AlbumPage = ({ albumData, albumId, albumReviews }: any) => {
  const router = useRouter();

  useEffect(() => {
    console.log(albumReviews);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-900">
      <div className="m-auto max-w-[1300px]">
        <Navbar />
        <AlbumCard
          currentAlbum={albumData}
          currentAlbumId={albumId}
          showLink={false}
        />
        {!albumReviews[0] && (
          <p className="text-center text-3xl text-white">No Reviews Made Yet</p>
        )}
        {albumReviews.map((review: any, index: number) => (
          <div
            key={review.id}
            className="flex  overflow-hidden rounded-lg   bg-slate-950 text-white "
          >
            <div className="float-left inline-block flex-grow-0 p-8">
              <Image
                src={`${review?.imageId}`}
                alt=""
                width={200}
                height={200}
                className="mr-5 inline-block h-[50px] w-[50px] rounded-full object-cover"
              />
              <h1 className="inline-block text-2xl ">{review.userName}</h1>
            </div>
            <div className="flex flex-1 justify-between p-4">
              <StarRating rating={review.rating} handleClick={() => {}} />
            </div>
            <p className="text-lg">{review.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export async function getServerSideProps(context: any) {
  const albumId = context.query.id;
  const albumData = await retrieveAlbumById(albumId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-album-by-mbid/${albumId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  const albumReviews = result.reviews;
  return { props: { albumData, albumId, albumReviews } };
}
export default AlbumPage;
