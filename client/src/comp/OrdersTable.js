import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Divider from "@material-ui/core/Divider";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";

import moment from "moment";

const columns = [
    { field: "id", hide: true, identity: true },
    { field: "orderNo", headerName: "Order number", width: 170 },
    { field: "deliveryTime", headerName: "Delivery Time", width: 200 },
    { field: "buyerName", headerName: "Buyer Name", width: 200 },
    { field: "totalPrice", headerName: "Total Price", width: 150 },
    { field: "paymentType", headerName: "Payment", width: 140 },
    { field: "error", headerName: "Error", width: 2000 },
];

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

export default function OrdersTable(
    orders = [],
    onSelectChanged = (selectedItems) => {},
) {
    const rows = [];
    const now = new Date();
    const dateString = moment(now).format("YYYY-MM-DD HH:mm:SS");

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        rows[rows.length] = {
            id: i,
            orderNo: order.orderNo,
            deliveryTime: order.deliveryTimeString,
            buyerName: order.buyerName,
            totalPrice: currencyFormatter.format(order.totalPrice),
            paymentType: order.paymentType,
        };
        if (order.error) {
            let errorMessage = "";
            if (typeof order.error === "object") {
                Object.values(order.error).forEach((values) => {
                    errorMessage += values;
                });
            } else {
                errorMessage = order.error;
            }

            rows[rows.length - 1].error = errorMessage;
        }
    }

    return (
        <div>
            <Divider />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    paddingLeft: 15,
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                {dateString}
            </div>
            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    id="orderstable"
                    rows={rows}
                    columns={columns}
                    pageSize={30}
                    rowHeight={30}
                    isRowSelectable={(params) => {
                        return !params.row.error;
                    }}
                    onSelectionModelChange={(params) => {
                        const selectedOrders = [];
                        for (let i = 0; i < params.selectionModel.length; i++) {
                            selectedOrders[i] =
                                orders[params.selectionModel[i]];
                        }
                        onSelectChanged(selectedOrders);
                    }}
                    checkboxSelection
                    pagination
                />
            </div>
        </div>
    );
}
