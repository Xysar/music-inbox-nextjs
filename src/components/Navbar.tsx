import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

import { SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {}, []);

  return (
    <nav className="flex w-full items-center justify-between px-10 py-6 text-slate-200">
      <Link href={"/"}>
        <div className="flex cursor-pointer items-center gap-5">
          <Image
            src="/record.svg"
            width={250}
            height={250}
            alt="vinyl record"
            className="h-24 w-24  flex-1"
          />
          <h1 className=" text-5xl">Music Inbox</h1>
        </div>
      </Link>
      <ul className="hidden items-center gap-10 text-lg sm:flex ">
        <SignedIn>
          <li>
            <Link
              href={`/user/${userId}`}
              className="rounded-xl px-8 py-2 duration-100 ease-in hover:bg-slate-900"
            >
              Profile
            </Link>
          </li>
        </SignedIn>
        <li>
          <Link
            href={"/"}
            className="rounded-xl px-8 py-2 duration-100 ease-in hover:bg-slate-900"
          >
            Search
          </Link>
        </li>

        <SignedIn>
          <li>
            <Link href={"/CreateReview"} className=" ">
              <p className="inline-block  h-full w-full rounded-lg bg-primary px-5 py-4 text-center duration-150 ease-in-out hover:scale-110  hover:bg-primary">
                +
              </p>
            </Link>
          </li>
          <li>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-16 h-16",
                },
              }}
            />
          </li>
        </SignedIn>
        <SignedOut>
          <li>
            <Link
              href="/Login"
              className="whitespace-nowrap rounded-xl bg-primary px-8 py-2 ring-orange-500  ring-offset-4 ring-offset-slate-900 duration-100 ease-in hover:bg-slate-900 hover:ring-2"
            >
              Log In
            </Link>
          </li>
        </SignedOut>
      </ul>
      <div className="relative sm:hidden">
        <button
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className=""
        >
          <Image
            className="h-16 w-16 min-w-fit p-2 "
            src="/bars-solid.svg"
            height={250}
            width={250}
            alt="menu button"
          />
        </button>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } absolute right-0 bg-slate-500`}
        >
          <ul className="flex  flex-col items-center p-2 text-2xl">
            <li>
              <button className="w-full px-8 py-2 hover:bg-slate-900">
                Search
              </button>
            </li>
            <li className="bg-orange-400 px-8 py-2 hover:bg-slate-900">
              <Link href="/login">Log In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
