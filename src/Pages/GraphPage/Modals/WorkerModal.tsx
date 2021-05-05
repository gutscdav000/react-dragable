import React from "react";
// import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { withStyles, createStyles, Theme, WithStyles } from "@material-ui/core";
// import { MuiTheme } from 'material-ui/styles';
import {
    Zoom,
    Typography,
    TextField,
    Select,
    Modal,
    MenuItem,
    InputLabel,
    Grid,
    FormControl,
    Button,
    Backdrop,
    IconButton,
    Card,
    Box,
    CardContent,
} from "@material-ui/core";
import BaseModal from "./BaseModal";
import { styles } from "./BaseModal";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onOpenDrawer: () => void;
};

class WorkerModal extends React.Component<
    ModalProps & WithStyles<typeof styles>
> {
    render() {
        const { classes } = this.props;
        return (
            <BaseModal
                open={this.props.open}
                onSubmit={this.props.onSubmit}
                onClose={this.props.onClose}
                onOpenDrawer={this.props.onOpenDrawer}
            >
                <Grid item xs={12} key={"b1"}>
                    Testing 1
                </Grid>
                <Grid item xs={12} key={"b2"}>
                    Testing 2
                </Grid>
                <Grid item xs={12} key={"b3"}>
                    Testing 3
                </Grid>
            </BaseModal>
        );
    }
}

export default withStyles(styles)(WorkerModal);
