import LandingPage from "./LandingPage";
import { ClerkProvider } from "@clerk/nextjs";
import { GetServerSideProps } from "next";

export default function Home({ albums, users }: any) {
  return <LandingPage albums={albums} users={users} />;
}

// export async function getServerSideProps() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-albums`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const userResponse = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-users`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const users = await userResponse.json();
//   const albums = await response.json();
//   return { props: { albums, users } };
// }
