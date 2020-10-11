import React, { useState, useEffect, useRef } from "react";
import ListLoading from "../../Components/ListLoading";
import ChartLoading from "./ChartLoading";
import DataList from "./DataList";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { CanvasJSChart } from 'canvasjs-react-charts'
import { Button } from 'react-bootstrap';

const validUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The Username must be between 3 to 20 characters.
            </div>
        );
    }
}

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!!
            </div>
        );
    }
};

const Profile = () => {
    const form = useRef();
    const checkBtn = useRef();
    const ListLoader = ListLoading();
    const ChartLoader = ChartLoading();
    const [loading, setLoading] = useState(false);
    const [chartloading, setChartloading] = useState(false);
    const [accOptions, setAccOptions] = useState({});
    const [lvlOptions, setLvlOptions] = useState({});

    const [userData, setUserData] = useState(null);
    const [userHandle, setUserHandle] = useState("");
    const [doSearch, setDoSearch] = useState(false);
    const cache = useRef({});
    let levels = {};
    let acc = {};
    const clearUser = () => {
        setUserHandle("");
        setDoSearch(false);
    }

    const handleChange = (e) => {
        setUserHandle(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            setDoSearch(true);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const apiUrl = `https://codeforces.com/api/user.status?handle=${userHandle}`;
            let res = {};
            if (cache.current[userHandle]) {
                res = cache.current[userHandle];
            }
            else {
                const response = await fetch(apiUrl);
                res = await response.json();
                cache.current[userHandle] = res;
            }
            if (res.status === "OK") {
                setUserData(res);
            }
            setLoading(false);
        }
        if (userHandle !== "") {
            fetchData();
        }
    }, [doSearch]);

    useEffect(() => {
        if (userData != null) {
            setChartloading(true);
            userData.result.forEach((element) => {
                if (levels[element.problem.index] === undefined)
                    levels[element.problem.index] = 1;
                else
                    levels[element.problem.index] += 1;

                if (acc[element.verdict] === undefined)
                    acc[element.verdict] = 1;
                else
                    acc[element.verdict] += 1;
            });

            const totalSubissions = userData.result.length;

            const lst1 = Object.keys(acc).map((key) => {
                if (key === "OK")
                    return { 'y': (acc[key] / totalSubissions) * 100, 'label': key, color: "green" };
                else if (key === "WRONG_ANSWER")
                    return { 'y': (acc[key] / totalSubissions) * 100, 'label': key, color: "red" };
                return { 'y': (acc[key] / totalSubissions) * 100, 'label': key };
            });

            const lst2 = Object.keys(levels).map((key) => {
                return { 'y': levels[key], 'label': key };
            });

            const options1 = {
                theme: "dark2",
                animationEnabled: true,
                exportFileName: "submissions",
                exportEnabled: true,
                title: {
                    text: "Submission Analysis"
                },
                data: [{
                    type: "pie",
                    toolTipContent: "{label}: <strong>{y}%</strong>",
                    indexLabel: "{y}%",
                    indexLabelPlacement: "inside",
                    dataPoints: lst1
                }]
            }
            const options2 = {
                theme: "dark2",
                exportFileName: "levels",
                exportEnabled: true,
                title: {
                    text: "Difficulty Analysis"
                },
                data: [{
                    type: "column",
                    showInLegend: true,
                    legendText: "{label}",
                    toolTipContent: "{label}: <strong>{y}</strong>",
                    indexLabel: "{y}",
                    indexLabelPlacement: "inside",
                    dataPoints: lst2
                }]
            }
            setAccOptions(options1);
            setLvlOptions(options2);
            setChartloading(false);
        }
    }, [userData]);


    if (doSearch) {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{userHandle}'s</strong> Profile
                    </h3>
                    <Button variant="primary" onClick={clearUser}>
                        Clear
                    </Button>
                </header>
                {/* <CanvasJSChart options={options}
                 onRef={ref => this.chart = ref} 
                /> */}
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <ChartLoader Chart={CanvasJSChart} isLoading={chartloading || loading} options={accOptions} />
                    </div>
                    {/* <div className="col-sm-6 col-12 mt-sm-2">
                        <ChartLoader Chart={CanvasJSChart} isLoading={chartloading || loading} options={langOptions} />
                    </div> */}
                </div>
                <div className="row mt-2">
                    <div className="col-sm-12 col-12">
                        <ChartLoader Chart={CanvasJSChart} isLoading={chartloading || loading} options={lvlOptions} />

                    </div>
                </div>
                <ListLoader List={DataList} data={userData} isLoading={loading || chartloading} />
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <header className="jumbotron col-sm-6 offset-3">
                    <Form onSubmit={handleSearch} ref={form}>
                        <div className="form-group">
                            <Input
                                type="text"
                                value={userHandle}
                                onChange={handleChange}
                                placeholder="Codeforces Handle"
                                validations={[required, validUsername]}
                                className="form-control"
                                name="username"
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-block btn-primary">Search</button>
                        </div>
                        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                    </Form>
                </header>
            </div>
        );
    }
};
export default Profile;