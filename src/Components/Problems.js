import React, { useState, useEffect } from 'react';
import ListLoading from './ListLoading';
import ProblemList from './ProblemList';
import { Jumbotron, Card, InputGroup, FormControl,Button,Col } from 'react-bootstrap';

function Problems() {

    const ListLoader = ListLoading();
    const [loading, setLoading] = useState(false);
    const [problems, setProblems] = useState(null);
    const [level, setLevel] = useState("");
    const [lowrating, setLowRating] = useState("");
    const [highrating, setHighRating] = useState("");
    const [minsubmissions, setMinSubmissions] = useState("");
    const [maxsubmissions, setMaxSubmissions] = useState("");
    const [trigger, setTrigger] = useState("");

    useEffect(() => {
        setLoading(true);
        const apiUrl = `https://codeforces.com/api/problemset.problems?tags=2-sat`;
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                setLoading(false)
                let final_problems = res.result.problems.filter(problem => (true))
                let pset = new Set();
                final_problems.forEach(problem => {
                    pset.add(problem.contestId + problem.index);
                })
                let final_statistics = res.result.problemStatistics.filter(problem => pset.has(problem.contestId + problem.index));
                let problemList = [];
                for (let i = 0; i < final_problems.length; i++) {
                    problemList.push({ problemData: final_problems[i], submissions: final_statistics[i].solvedCount })
                }
                setProblems({ status: res.status, problems: problemList });
            })
    }, [trigger]);

    const reset = () => {
        setLevel("");
        setHighRating("");
        setLowRating("");
        setMinSubmissions("");
        setMaxSubmissions("");
        setTrigger(trigger=>(trigger+1)%2);
    }

    return (
        <div>
            <Jumbotron>
                <div className="row h-25">
                    <div className="col-12 col-sm-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Level</Card.Title>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        type="text"
                                        value={level}
                                        placeholder="e.g. A,B,C,C1,D..."
                                        onChange={(e) => {
                                            setLevel(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-sm-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Rating</Card.Title>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        type="number"
                                        value={lowrating}
                                        placeholder="lowest"
                                        onChange={(e) => {
                                            setLowRating(e.target.value)
                                        }}
                                    />
                                    <FormControl
                                        type="number"
                                        value={highrating}
                                        placeholder="highest"
                                        onChange={(e) => {
                                            setHighRating(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-12 col-sm-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Submissions</Card.Title>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        type="number"
                                        value={minsubmissions}
                                        placeholder="min"
                                        onChange={(e) => {
                                            setMinSubmissions(e.target.value);
                                        }}
                                    />
                                    <FormControl
                                        type="number"
                                        value={maxsubmissions}
                                        placeholder="max"
                                        onChange={(e) => {
                                            setMaxSubmissions(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Card.Body>
                        </Card>
                    </div>
                    </div>
                <div className="row mt-2 md-0">
                    <Col md={{offset: 5 }}>
                        <Button onClick={() => { setTrigger((trigger)=>(trigger+1)%2)}} >Apply Filters</Button>
                        <Button className="ml-1" onClick={() => { reset() }} >Reset</Button>
                    </Col>
                </div>
            </Jumbotron>
            <ListLoader List={ProblemList} data={problems} isLoading={loading} />
        </div>
    );
};

export default Problems;