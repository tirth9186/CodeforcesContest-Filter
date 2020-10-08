import React, { useState, useEffect, useRef} from "react";
import AuthService from "../services/auth.service";
import ListLoading from "../../Components/ListLoading";
import ChartLoading from "./ChartLoading";
import DataList from "./DataList";
import { CanvasJSChart } from 'canvasjs-react-charts'

const Profile = () => {
    const ListLoader = ListLoading();
    const ChartLoader = ChartLoading();
    const [loading, setLoading] = useState(false);
    const [chartloading, setChartloading] = useState(false);
    const [accOptions, setAccOptions] = useState({});
    const [lvlOptions, setLvlOptions] = useState({});
    const [langOptions, setLangOptions] = useState({});
    const [userData, setUserData] = useState(null);
    const [currentUser, setcurrentUser] = useState(AuthService.getUser());
    const cache = useRef({});
    let levels = {};
    let language = {};
    let acc = {};
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const apiUrl = `https://codeforces.com/api/user.status?handle=${currentUser.handle}&from=1&count=500`;
            let res = {};
            if (cache.current[currentUser.handle]) {
                res = cache.current[currentUser.handle];
            }
            else {
                const response = await fetch(apiUrl);
                res = await response.json();
                cache.current[currentUser.handle] = res;
            }
            setUserData(res);
            setLoading(false);
        }
        if (currentUser !== null) {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (userData != null) {
            setChartloading(true);
            userData.result.forEach((element) => {
                if (levels[element.problem.index] === undefined)
                    levels[element.problem.index] = 1;
                else
                    levels[element.problem.index] += 1;

                if (language[element.programmingLanguage] === undefined)
                    language[element.programmingLanguage] = 1;
                else
                    language[element.programmingLanguage] += 1;

                if (acc[element.verdict] === undefined)
                    acc[element.verdict] = 1;
                else
                    acc[element.verdict] += 1;
            });

            const totalSubissions = userData.result.length;

            const lst1 = Object.keys(acc).map((key) => {
                if (key === "OK")
                    return { 'y': (acc[key] / totalSubissions) * 100, 'label': key,color:"green" };
                else if (key === "WRONG_ANSWER")
                    return { 'y': (acc[key] / totalSubissions) * 100, 'label': key,color:"red" };
                return { 'y': (acc[key] / totalSubissions) * 100, 'label': key };
            });

            const lst2 = Object.keys(levels).map((key) => {
                return { 'y': levels[key], 'label': key };
            });

            const lst3 = Object.keys(language).map((key) => {
                return { 'y': language[key], 'label': key };
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
            const options3 = {
                theme: "dark2",
                animationEnabled: true,
                exportFileName: "languages",
                exportEnabled: true,
                title: {
                    text: "Languages Analysis"
                },
                data: [{
                    type: "pie",
                    showInLegend: true,
                    legendText: "{label}",
                    toolTipContent: "{label}: <strong>{y}</strong>",
                    indexLabel: "{y}",
                    indexLabelPlacement: "inside",
                    dataPoints: lst3
                }]
            }
            setAccOptions(options1);
            setLvlOptions(options2);
            setLangOptions(options3);
            setChartloading(false);
        }
    }, [userData]);


    if (currentUser !== null) {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header>
                <p>
                    <strong>Email:</strong>{currentUser.email}
                </p>
                <p>
                    <strong>Handle:</strong>{currentUser.handle}
                </p>
                {/* <CanvasJSChart options={options}
                 onRef={ref => this.chart = ref} 
                /> */}
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <ChartLoader Chart={CanvasJSChart} isLoading={chartloading||loading} options={accOptions} />
                    </div>
                    <div className="col-sm-6 col-12 mt-sm-2">
                        <ChartLoader Chart={CanvasJSChart} isLoading={chartloading||loading} options={langOptions} />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-12 col-12">
                        <ChartLoader Chart={CanvasJSChart} isLoading={chartloading||loading} options={lvlOptions} />

                    </div>
                </div>
                <ListLoader List={DataList} data={userData} isLoading={loading||chartloading} />
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <header className="alert alert-danger mt-5">
                    <h3>
                        Unauthorized Access!!
                    </h3>
                </header>
            </div>
        );
    }
};
export default Profile;