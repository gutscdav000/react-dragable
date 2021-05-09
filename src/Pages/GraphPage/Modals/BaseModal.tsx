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
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

export const styles = (theme: Theme) =>
    createStyles({
        modal: {
            position: "absolute",
            width: 400,
            height: 200,
            overflow: "scroll",
            backgroundColor: theme?.palette?.background?.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        center: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        button: {
            width: "100%",
        },
        divHeader: {
            overflow: "scroll",
            backgroundColor: theme?.palette?.background?.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    });

type ModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: () => void;
    onOpenDrawer: () => void;
};

class BaseModal extends React.Component<
    ModalProps & WithStyles<typeof styles>
> {
    render() {
        const { classes } = this.props;

        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                className={classes.center}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Card
                    style={{ overflow: "auto", width: "50vw", height: "50vh" }}
                >
                    <CardContent>
                        <Grid>
                            <IconButton
                                aria-label="add"
                                onClick={this.props.onOpenDrawer}
                            >
                                <AddIcon />
                            </IconButton>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid container>{this.props.children}</Grid>
                    </CardContent>
                </Card>
            </Modal>
        );
    }
}

export default withStyles(styles)(BaseModal);
