import { Link } from 'gatsby';
import React from 'react';

export default function Header() {
  return (
    <header className="px-6 py-4 border-b">
      <div className="flex justify-between max-w-screen-md mx-auto">
        <ul className="flex">
          <Link to="/">
            <li className="text-2xl text-violet-500 font-bold">seunghee 블로그</li>
          </Link>
        </ul>

        <ul className="flex">
          <Link to="/">
            <li className="text-stone-950 text-xl mr-5">기술 글</li>
          </Link>

          {/* <Link to="/about">
            <li className="text-stone-950 text-xl mr-5">about</li>
          </Link> */}
        </ul>
      </div>
    </header>
  );
}
