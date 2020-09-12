import React, { useState, useEffect } from 'react';
import ListLoading from './Components/ListLoading';
import ContestType from './Components/ContestType';
import ContestCategory from './Components/ContestCategory';
function App() {
  const ListLoader = ListLoading();

  const [loading, setLoading] = useState(false);  
  const [contests, setContests] = useState(null);
  const [contestType, setContestType] = useState('All');
  const [contestCategory, setContestCategory] = useState('All');
  


  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://codeforces.com/api/contest.list?lang=en`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        let final_res = res.result.filter( contest=> (contestType === 'All' || contest.type === contestType) && (contestCategory === 'All' || contest.name.indexOf(contestCategory)!==-1 ))
        setContests({status:res.status, result:final_res});
      })
  },[contestType,contestCategory]);
  
  return (
    <div>
      <ContestType type={contestType} setContestType={setContestType}/>
      <ContestCategory category = {contestCategory} setContestCategory={setContestCategory} />
      <ListLoader isLoading={loading} contests={contests}/>
    </div>
  );
};
 
export default App;
