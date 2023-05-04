import { useRouter } from "next/router";
import React from "react";
import AlbumCard from "@/components/AlbumCard";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { retrieveAlbumById } from "@/utils/lastfm";

const AlbumPage = ({ albumData, albumId }: any) => {
  return (
    <section className=" relative bg-slate-800">
      <div className="max-w-[1300px] m-auto">
        <Navbar />
        <AlbumCard currentAlbum={albumData} currentAlbumId={albumId} />
      </div>
    </section>
  );
};

export async function getServerSideProps(context: any) {
  const albumId = context.query.id;
  const albumData = await retrieveAlbumById(albumId);
  return { props: { albumData, albumId } };
}
export default AlbumPage;
