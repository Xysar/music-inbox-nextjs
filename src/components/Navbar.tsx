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
        <div className="flex items-center gap-5 cursor-pointer">
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
      <ul className="hidden items-center gap-10   text-lg sm:flex ">
        <SignedIn>
          <li>
            <Link
              href={`/user/${userId}`}
              className="rounded-xl px-8 py-2 ease-in duration-100 hover:bg-slate-900"
            >
              Library
            </Link>
          </li>
        </SignedIn>
        <li>
          <Link
            href={"/"}
            className="rounded-xl px-8 py-2 ease-in duration-100 hover:bg-slate-900"
          >
            Search
          </Link>
        </li>
        <li>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-16 h-16",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/Login"
              className="whitespace-nowrap rounded-xl bg-primary ease-in hover:ring-2 ring-offset-4  ring-offset-slate-900 ring-orange-500 duration-100 hover:bg-slate-900 px-8 py-2"
            >
              Log In
            </Link>
          </SignedOut>
        </li>
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
            <li className="px-8 py-2 bg-orange-400 hover:bg-slate-900">
              <Link href="/login">Log In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
