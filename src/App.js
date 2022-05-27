import React from 'react';
import Places from './components/Places';
import { RecentSearches } from './components/RecentSearches';

const App = () => {
  return (
    <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}><RecentSearches /></div>
        <div style={{ flex: '4' }}><Places /></div>
    </div>
  );
}

export default App;