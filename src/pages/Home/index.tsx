import React from 'react';
import Spinner from '../../components/Spinner';
import LastSearchs from './components/LastSearchs';
import Search from './components/Search';

/**
 * Function to define the Home page component of application.
 * @returns The React component
 */
export default function Home() {
  return (
    <main>
      <Spinner text="Loading data from Twitter ..." />
      <header>
        <h1>Axosoft Technical Test</h1>
      </header>
      <section>
        <LastSearchs />
        <Search />
      </section>
    </main>
  );
}
