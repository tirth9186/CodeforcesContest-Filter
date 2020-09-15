import React, { useState, useEffect } from 'react';
import ListLoading from './ListLoading';
import ProblemList from './ProblemList';
import { Jumbotron } from 'react-bootstrap';

function Problems() {

    const ListLoader = ListLoading();
    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState(null);
    const [problemCategory, setProblemCategory] = useState('All');
    useEffect(() => {
        setLoading(true);
        const apiUrl = `https://codeforces.com/api/problemset.problems?tags=2-sat`;
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                setLoading(false)
                let final_problems = res.result.problems.filter(problem => (problemCategory === 'All'))
                let pset = new Set();
                final_problems.forEach(problem => { 
                    pset.add(problem.contestId + problem.index);
                })
                let final_statistics = res.result.problemStatistics.filter(problem => pset.has(problem.contestId + problem.index));
                let problemList = [];
                for (let i = 0; i < final_problems.length; i++){
                    problemList.push({ problemData: final_problems[i], submissions: final_statistics[i].solvedCount})
                }
                setProblems({ status: res.status, problems:problemList});
            })
    }, [problemCategory]);

    return (
        <div>
            <Jumbotron>
                <div className="row">
                    <div className="col-3">
                        {/* <ContestCategory className="mr-auto" category={problemCategory} setContestCategory={setProblemCategory} /> */}
                    </div>
                    <div className="col-6">
                        <h2>Problem List</h2>
                    </div>
                </div>

            </Jumbotron>
            <ListLoader List={ProblemList} data={problems} isLoading={loading} />
        </div>
    );
};

export default Problems;