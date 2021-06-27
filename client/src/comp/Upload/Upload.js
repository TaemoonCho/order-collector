import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Popover from "@material-ui/core/Popover";
import Alert from "@material-ui/lab/Alert";
import ResultTable from "./ResultTable";

import { Publish } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
        backgroundColor: "#563695",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    button: {
        margin: theme.spacing(1),
        color: "white",
        background: "#563695",
        "&:hover": {
            backgroundColor: "#efb261",
            borderColor: "#0062cc",
            boxShadow: "none",
            color: "563695",
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Upload(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const popoverOpen = Boolean(anchorEl);
    const popoverId = popoverOpen ? "popover" : undefined;
    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = (event) => {
        console.log(props);
        if (props.orders && props.orders.length > 0) {
            setOpen(true);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                size="medium"
                startIcon={<Publish />}
                onClick={handleClickOpen}
            >
                UPLOAD TO ECOUNT
            </Button>
            <Popover
                id={popoverId}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
            >
                <Alert severity="error">
                    There is no seleted order! Select at least an order.
                </Alert>
            </Popover>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Upload to Ecount
                        </Typography>
                        <Button
                            autoFocus
                            variant="contained"
                            onClick={handleClose}
                        >
                            UPLOAD
                        </Button>
                    </Toolbar>
                </AppBar>
                <ResultTable orders={props.orders} />
            </Dialog>
        </div>
    );
}
