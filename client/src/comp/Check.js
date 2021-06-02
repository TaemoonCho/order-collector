import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        width: "100%",
        overflowX: "auto",
    },
    table: {
        minWidth: 1080,
    },
    progress: {
        margin: 2,
        color: "#4E2689",
    },
});

class Check extends Component {
    state = {
        fontColor: "orange",
        completed: 0,
        apiResponse: "Checking API server now.",
    };

    callAPI() {
        fetch("http://localhost:9000/check")
            .then((res) => res.text())
            .then((res) => {
                clearTimeout(this.timer);
                this.setState({
                    fontColor: "green",
                    completed: 1,
                    apiResponse: res,
                });
            })
            .catch((err) => {
                clearTimeout(this.timer);
                this.setState({
                    fontColor: "red",
                    completed: 1,
                    apiResponse: "Couldn't connect with the API server.",
                });
            });
    }

    componentDidMount() {
        //this.timer = setTimeout(this.failToCheck, 5000);
        this.timer = setTimeout(this.failToCheck, 5000);
        this.callAPI();
    }

    failToCheck = () => {
        this.setState({
            fontColor: "red",
            completed: 1,
            apiResponse: "Fail to check the API server.",
        });
    };

    renderProgressDiv() {
        const { classes } = this.props;
        if (this.state.completed < 1) {
            return (
                <CircularProgress
                    className={classes.progress}
                    variant="indeterminate"
                />
            );
        }
    }

    render() {
        const fontColor = {
            color: this.state.fontColor,
        };
        return (
            <div className="Check">
                <p className="message">
                    <font color={fontColor.color}>
                        {this.state.apiResponse}
                    </font>
                </p>
                <div>{this.renderProgressDiv()}</div>
            </div>
        );
    }
}

export default withStyles(styles)(Check);
