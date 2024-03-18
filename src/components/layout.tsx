import * as React from 'react';
import Header from './Header';
import { Footer } from './Footer';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

const Layout = ({ location, children }: { location: Location; children: any }) => {
  const rootPath = '/';
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Header location={location} />
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
