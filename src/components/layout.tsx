import * as React from 'react';
import Header from './Header';
import { Footer } from './Footer';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className="py-12 pb-20 px-6 flex mx-auto max-w-screen-md sm:max-w-screen-lg">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
