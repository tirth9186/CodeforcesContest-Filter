import React, { useState, useEffect } from 'react';
import ListLoading from './ListLoading';
import ContestCategory from './ContestCategory';

function Problems() {

    const ListLoader = ListLoading();
    const [loading, setLoading] = useState(false);
    const [contests, setContests] = useState(null);
    const [contestCategory, setContestCategory] = useState('All');

    useEffect(() => {
        setLoading(true);
        const apiUrl = `https://codeforces.com/api/contest.list?lang=en`;
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                setLoading(false)
                let final_res = res.result.filter(contest => (contestCategory === 'All' || contest.name.indexOf(contestCategory) !== -1))
                setContests({ status: res.status, result: final_res });
            })
    }, [contestCategory]);

    return (
        <div>
            <h1>This is a Problem page...</h1>
            <ContestCategory category={contestCategory} setContestCategory={setContestCategory} />
            <ListLoader isLoading={loading} contests={contests} />
        </div>
    );
};

export default Problems;