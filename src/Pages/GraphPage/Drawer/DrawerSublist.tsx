import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Material UI Core Components
import Badge from "@material-ui/core/Badge";

import {
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
// Material UI Icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const DrawerSubList = ({
    handleDrawerClose,
    onCreateNode,
    nodeTypes,
    title,
}: {
    handleDrawerClose: () => void;
    onCreateNode: (nodeType: String) => void;
    nodeTypes: String[];
    title: String;
}) => {
    let [menuList, setMenuList] = useState(false);
    const color = menuList ? "#ff6044" : "#448AFF";

    return (
        <>
            <ListItem button onClick={() => setMenuList(!menuList)}>
                <ListItemIcon>
                    <TrendingUpIcon style={{ color }} />
                </ListItemIcon>
                '
                <ListItemText
                    disableTypography
                    primary={<Typography variant="button">{title}</Typography>}
                />
                {menuList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={menuList} timeout="auto" unmountOnExit>
                <List /*compnent="div" disablePadding*/>
                    {
                        /*nodeTypes === undefined && nodeTypes.length === 0 ? []:*/ nodeTypes.map(
                            (node, i) => (
                                <ListItem
                                    key={i}
                                    button
                                    // TODO: make this alter graph too
                                    onClick={() => onCreateNode(node)}
                                >
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Badge color={"primary"}>
                                                <Typography variant="overline">
                                                    {node}
                                                </Typography>
                                            </Badge>
                                        }
                                        style={{
                                            paddingLeft: "1rem",
                                            color: "#448AFF",
                                        }}
                                    />
                                </ListItem>
                            )
                        )
                    }
                </List>
            </Collapse>
        </>
    );
};

export default DrawerSubList;
