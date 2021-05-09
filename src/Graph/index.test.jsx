import { findByTestAttr } from "../../test/testUtil";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";
import Graph from ".";
import React from "react";
import { GraphView, IEdge, INode } from "react-digraph";
import {
    default as nodeConfig,
    WORKER_TYPE,
    NODE_KEY,
    POLY_TYPE,
    NORMAL_EDGE_TYPE,
    BRANCH_TYPE,
    ENDPOINT_TYPE,
} from "./config";
import { State } from "./Interfaces/IState";
import { IGraph } from "./Interfaces/IGraph";

const sample: IGraph = {
    edges: [
        {
            source: "start1",
            target: "a1",
            type: NORMAL_EDGE_TYPE,
        },
        {
            source: "a1",
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
            title: "Node B (2)",
            type: WORKER_TYPE,
            x: 100,
            y: 250,
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
/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (openModal) => {
    return shallow(<Graph {...{ inputGraph: sample, openModal: openModal }} />);
};

test("click node calls modal render state", () => {
    const openModal = jest.fn();
    const wrapper = setup(openModal);
    const nodeComp = findByTestAttr(wrapper, "graph-view");
    nodeComp.props().onSelectNode(nodeComp.props().nodes[0], {
        target: { id: "a1", value: "value" },
    });
    expect(openModal).toHaveBeenCalled();
});
