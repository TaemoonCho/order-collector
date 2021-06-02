import React, { Component } from "react";
// import ReactDOM from "react-dom";
import logo from "./ms_logo_512.png";
import "./App.css";

import Check from "./comp/Check";

// import CircularProgress from "@material-ui/core/CircularProgress";
// import { withStyles } from "@material-ui/core/styles";

// const styles = (theme) => ({
//     root: {
//         width: "100%",
//         overflowX: "auto",
//     },
//     table: {
//         minWidth: 1080,
//     },
//     progress: {
//         margin: 2,
//         color: "#4E2689",
//     },
// });
class App extends Component {
    state = {
        status: 0,
    };

    // constructor(props) {
    //     super(props);
    // }

    // callAPI() {
    //     fetch("http://localhost:9000/check")
    //         .then((res) => res.text())
    //         .then((res) => {
    //             clearTimeout(this.timer);
    //             this.setState({
    //                 completed: 1,
    //                 apiResponse: res,
    //             });
    //         })
    //         .catch((err) => {
    //             clearTimeout(this.timer);
    //             this.setState({
    //                 completed: 1,
    //                 apiResponse: "Couldn't connect with the API server.",
    //             });
    //         });
    // }

    // componentDidMount() {
    // this.timer = setTimeout(this.failToCheck, 5000);
    // this.callAPI();
    // }r

    // componentDidUpdate() {
    //     if (this.state.completed < 1) {
    //     } else {
    //     }
    // }

    // componentWillUnmount() {
    // }

    // failToCheck = () => {
    //     this.setState({
    //         completed: 1,
    //         apiResponse: "Fail to check the API server.",
    //     });
    // };

    // renderProgressDiv() {
    //     const { classes } = this.props;
    //     if (this.state.completed < 1) {
    //         console.log("rendering CircularProgress");
    //         return (
    //             <CircularProgress
    //                 className={classes.progress}
    //                 variant="indeterminate"
    //             />
    //         );
    //     }
    // }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="header-div">
                        <img src={logo} className="App-logo" alt="logo" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <br />
                        <p>
                            <b>Order collector</b>
                        </p>
                    </div>
                    <p align="right" className="subtitle">
                        for Market Saigon
                    </p>
                </header>
                <Check />
            </div>
        );
    }
}

// export default withStyles(styles)(App);
export default App;
