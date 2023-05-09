import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AlbumCard from "@/components/AlbumCard";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { retrieveAlbumById } from "@/utils/lastfm";

const AlbumPage = ({ albumData, albumId, albumReviews }: any) => {
  const router = useRouter();

  useEffect(() => {
    console.log(albumReviews);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-800">
      <div className="m-auto max-w-[1300px]">
        <Navbar />
        <AlbumCard currentAlbum={albumData} currentAlbumId={albumId} />
        {albumReviews.map((review: any, index: number) => (
          <div
            key={review.id}
            className="flex justify-between bg-slate-500 text-white"
          >
            test
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
