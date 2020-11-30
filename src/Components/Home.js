import React from 'react';
import { Card, Button,CardDeck } from 'react-bootstrap';
function Home() {
    return (
        <React.Fragment>
            <div className="hero">
            </div>
            <CardDeck className="mt-3 mb-3">
                <Card bg="dark" text="light" >
                    <Card.Img variant="top" src="algorithm.png" height="284px" />
                    <Card.Body>
                        <Card.Title>ProblemSet</Card.Title>
                        <Card.Text>
                            All the problems of the past contests held on Codeforces.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="light" href="/problems">Go to ProblemSet</Button>
                    </Card.Footer>
                </Card>
                <Card bg="dark" text="light">
                    <Card.Img variant="top" src="trophy.png" height="284px"  />
                    
                    <Card.Body>
                        <Card.Title>Contests</Card.Title>
                        <Card.Text>
                            All the past contests held on Codeforces.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="light" href="/contests">Go to Contests</Button>
                    </Card.Footer>
                </Card>
                <Card bg="dark" text="light">
                    <Card.Img variant="top" src="programmer.png" height="284px"  />
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <Card.Text>
                            See your submissions history and statistics.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="light" href="/profile">Check profile</Button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </React.Fragment>
    );
}
export default Home;
