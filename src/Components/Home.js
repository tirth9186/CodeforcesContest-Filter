import React from 'react';
import { Card, Button } from 'react-bootstrap';
function Home() {
    return (
        <React.Fragment>
            <div className="hero">
            </div>
        <div className=" mt-3 row align-content-center">
            <div className="col-sm-6 col-md-6">
                <Card bg="dark" text="light" >
                    {/* <Card.Img variant="top" src="problem.jpg" /> */}
                    <Card.Body>
                        <Card.Title>ProblemSet</Card.Title>
                        <Card.Text>
                            All the problems of the past contests held on Codeforces.
                    </Card.Text>
                        <Button variant="light" href="/problems">Go to ProblemSet</Button>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-sm-6 col-md-6">
                <Card bg="dark" text="light">
                    {/* <Card.Img variant="top" src="contest.jpg" /> */}
                    <Card.Body>
                        <Card.Title>Contests</Card.Title>
                        <Card.Text>
                            All the past contests held on Codeforces.
                    </Card.Text>
                        <Button variant="light" href="/contests">Go to Contests</Button>
                    </Card.Body>
                </Card>
            </div>
            
        </div>
        </React.Fragment>
    );
}
export default Home;