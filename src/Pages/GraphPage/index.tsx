import React from "react";
import Graph from "../../Graph";
import { IGraph } from "../../Graph/Interfaces/IGraph";
import { GraphView, IEdge, INode } from "react-digraph";
import {
    default as nodeConfig,
    WORKER_TYPE,
    NODE_KEY,
    POLY_TYPE,
    NORMAL_EDGE_TYPE,
    BRANCH_TYPE,
    ENDPOINT_TYPE,
} from "../../Graph/config";
import Drawer from "./Drawer";
import BaseModal from "./Modals/BaseModal";
import WorkerModal from "./Modals/WorkerModal";

const GraphPage = () => {
    const [state, setState] = React.useState({
        modalOpen: false,
        drawerOpen: false,
    });

    const sample: IGraph = {
        edges: [
            {
                source: "start1",
                target: "a2",
                type: NORMAL_EDGE_TYPE,
            },
            {
                source: "a2",
                target: "a1",
                type: NORMAL_EDGE_TYPE,
            },
            {
                source: "a1",
                target: "a4",
                type: NORMAL_EDGE_TYPE,
            },
            {
                source: "a1",
                target: "a3",
                type: NORMAL_EDGE_TYPE,
            },
            {
                source: "a3",
                target: "end1",
                type: NORMAL_EDGE_TYPE,
            },
            {
                source: "a4",
                target: "end1",
                type: NORMAL_EDGE_TYPE,
            },
        ],
        nodes: [
            {
                id: "start1",
                title: "Start",
                type: ENDPOINT_TYPE,
                x: 100,
                y: 100,
            },
            {
                id: "a1",
                title: "Node A (1)",
                type: BRANCH_TYPE,
                x: 100,
                y: 400,
            },
            {
                id: "a2",
                title: "Node B (2)",
                type: WORKER_TYPE,
                x: 100,
                y: 250,
            },
            {
                id: "a3",
                title: "Node C (3)",
                type: WORKER_TYPE,
                x: 0,
                y: 550,
            },
            {
                id: "a4",
                title: "Node D (4)",
                type: WORKER_TYPE,
                x: 200,
                y: 550,
            },
            {
                id: "end1",
                title: "End",
                type: ENDPOINT_TYPE,
                x: 100,
                y: 700,
            },
        ],
    };

    const openModal = () =>
        setState((prevState) => ({ ...prevState, modalOpen: true }));

    const onCloseModal = () =>
        setState((prevState) => ({ ...prevState, modalOpen: false }));

    const onSubmit = () =>
        setState((prevState) => ({
            ...prevState,
            modalOpen: false,
            drawerOpen: false,
        }));

    const onOpenDrawer = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));

    const onCloseDrawer = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
        <div data-test="graph-page">
            <Drawer drawerOpen={state.drawerOpen} onClickaway={onCloseDrawer} />
            <Graph
                data-test="graph-class"
                inputGraph={sample}
                openModal={openModal}
            />
            <WorkerModal
                data-test="worker-modal"
                open={state.modalOpen}
                onClose={onCloseModal}
                onSubmit={onSubmit}
                onOpenDrawer={onOpenDrawer}
            />
        </div>
    );
};

export default GraphPage;
