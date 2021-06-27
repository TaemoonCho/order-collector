import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { GetApp } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import OrdersTable from "./OrdersTable";
import Upload from "./Upload/Upload";

const styles = (theme) => ({
    root: {
        width: "100%",
        overflowX: "auto",
        flexGrow: 1,
    },
    table: {
        minWidth: 1080,
    },
    progress: {
        margin: 2,
        color: "#4E2689",
    },
    button: {
        margin: theme.spacing(1),
        color: "white",
        background: "purple",
        "&:hover": {
            backgroundColor: "#efb261",
            borderColor: "#0062cc",
            boxShadow: "none",
            color: "purple",
        },
        "&:active": {
            boxShadow: "none",
            backgroundColor: "#0062cc",
            borderColor: "#005cbf",
        },
        "&:focus": {
            boxShadow: "0 0 0 0.1rem rgba(120,0,120,.5)",
        },
    },
});

let selectedOrders = [];

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontColor: "orange",
            completed: 0,
            apiResponse: "Checking API server now.",
            orders: [],
        };
        this.onSelectChanged = this.onSelectChanged.bind(this);
    }

    componentDidMount() {
        this.onDownloadClick();
    }

    // uploadOrders() {}

    downloadOrders() {
        fetch(process.env.REACT_APP_ORDERS_BACKEND_URL)
            .then((res) => res.text())
            .then((res) => {
                clearTimeout(this.timer);
                // remove this on production
                const orderString =
                    '[{"orderNo":"2021062615470","orderTime":1624701771,"recipientName":"TEST","recipientPhone":"0961122564","recipientAddress":"1606, Thap B, Đường Nguyễn Hữu Thọ, Xã Phước Kiên Quận Nhà","buyerName":"TEST","buyerEmail":"jake@xod.vn","depositorName":"Imweb","paymentType":"transfer","pointUsed":145000,"totalPrice":900000,"error":null,"deliveryTimeString":"2022-06-26 17:00~19:30","deliveryStartTime":1624701600,"products":[{"productNo":1689,"productName":"테스트용 등록하지마세요 (사이즈:XL)","sku":"TEST1689XL","unitPrice":100000,"quantity":4},{"productNo":1689,"productName":"테스트용 등록하지마세요 (사이즈:L)","sku":"TEST1689L","unitPrice":100000,"quantity":3},{"productNo":1689,"productName":"테스트용 등록하지마세요 (사이즈:M)","sku":"TEST1689M","unitPrice":100000,"quantity":2},{"productNo":0,"productName":"포인트 사용","unitPrice":-145000,"sku":"Method0002","quantity":1}]}]';
                const fakeOrders = JSON.parse(orderString);
                // remove this on production

                const orders = JSON.parse(res);
                // remove this on production
                orders[orders.length] = fakeOrders[0];

                this.setState({
                    completed: 2,
                    apiResponse: res,
                    orders: orders,
                });
            })
            .catch((err) => {
                clearTimeout(this.timer);
                this.setState({
                    completed: 1,
                    apiResponse: "Couldn't connect with the API server.",
                });
            });
    }

    failToFetch = () => {
        this.setState({
            fontColor: "red",
            completed: 1,
            apiResponse: "Fail to fetch the API server.",
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

    renderOrdersTable() {
        if (this.state.completed === 2) {
            return OrdersTable(this.state.orders, this.onSelectChanged);
        }
    }

    onSelectChanged(selectedItems) {
        console.log(selectedItems);
        selectedOrders = selectedItems;
        this.setState(this.state);
    }

    onDownloadClick() {
        this.timer = setTimeout(this.failToCheck, 40000);
        this.setState({
            fontColor: "orange",
            completed: 0,
            apiResponse: "Checking API server now.",
            orders: [],
        });
        this.downloadOrders();
    }

    renderButtons() {
        const { classes } = this.props;
        if (this.state.completed === 2) {
            return (
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={3} align="left">
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                size="medium"
                                startIcon={<GetApp />}
                                onClick={() => {
                                    this.onDownloadClick();
                                }}
                            >
                                Get orders from Imweb
                            </Button>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={3} align="right">
                            <Upload orders={selectedOrders} />
                        </Grid>
                    </Grid>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="GetOrders">
                <div>{this.renderProgressDiv()}</div>
                <div>{this.renderButtons()}</div>
                <div>{this.renderOrdersTable()}</div>
            </div>
        );
    }
}

export default withStyles(styles)(Orders);
