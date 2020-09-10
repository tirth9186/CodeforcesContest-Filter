import React, { useState, useEffect } from 'react';
import ListLoading from './Components/ListLoading';

function App() {
  const ListLoader = ListLoading();
  const [appState, setAppState] = useState({
    loading: false,
    contests: null
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://codeforces.com/api/contest.list?gym=true`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        setAppState({ loading: false, contests: res });
      })
  }, [setAppState]);
  
  return (
    <div>
      <ListLoader isLoading={appState.loading} contests={appState.contests}/>
    </div>
  );
};
 
export default App;
