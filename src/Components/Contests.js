import React, { useState, useEffect } from 'react';
import ListLoading from './ListLoading';
import ContestCategory from './ContestCategory';
import ContestList from './ContestList';
import { Jumbotron } from 'react-bootstrap';

function Contests() {
    
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
            <Jumbotron>
                <div className="row">
                    <div className="col-3">
                        <ContestCategory className="mr-auto" category={contestCategory} setContestCategory={setContestCategory} />
                    </div>
                    <div className="col-6">
                        <h2>{contestCategory} Contests List</h2>
                    </div>
                </div>

            </Jumbotron>
            <ListLoader List={ContestList} data={contests} isLoading={loading}/>
        </div>
    );
};

export default Contests;