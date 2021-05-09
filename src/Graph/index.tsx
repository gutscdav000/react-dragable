import React, { useState, useRef } from "react";
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

const Graph = ({
    inputGraph,
    openModal,
}: {
    inputGraph: IGraph;
    openModal: () => void;
}) => {
    const customNodeRef = useRef(null);
    const [state, setState] = useState({
        graph: inputGraph,
        selected: null,
    } as State);

    const getNodeIndex = (searchNode: INode) => {
        return state.graph.nodes.findIndex((node) => {
            return node[NODE_KEY] === searchNode[NODE_KEY];
        });
    };

    // Helper to find the index of a given edge
    const getEdgeIndex = (searchEdge: IEdge) => {
        return state.graph.edges.findIndex((edge) => {
            return (
                edge.source === searchEdge.source &&
                edge.target === searchEdge.target
            );
        });
    };

    // Given a nodeKey, return the corresponding node
    // const getViewNode = (nodeKey) => {
    //   const searchNode = {};
    //   searchNode[NODE_KEY] = nodeKey;
    //   const i = getNodeIndex(searchNode);
    //   return state.graph.nodes[i];
    // }

    const addStartNode = (e: any) => {
        const graph = state.graph;

        // using a new array like this creates a new memory reference
        // this will force a re-render
        graph.nodes = [
            {
                id: Date.now().toString(),
                title: "Node A",
                type: BRANCH_TYPE,
                x: e ? e.screenX : 0, //Find correct coordinates to drop
                y: e ? e.screenY : 0,
            },
            ...state.graph.nodes,
        ];
        setState((prevState) => ({
            ...prevState,
            graph,
        }));
    };

    const deleteStartNode = () => {
        const graph = state.graph;
        graph.nodes.splice(0, 1);
        // using a new array like this creates a new memory reference
        // this will force a re-render
        graph.nodes = [...state.graph.nodes];
        setState((prevState) => ({
            ...prevState,
            graph,
        }));
    };

    // Called by 'drag' handler, etc..
    // to sync updates from D3 with the graph
    const onUpdateNode = (viewNode: INode) => {
        const graph = state.graph;
        const i = getNodeIndex(viewNode);
        graph.nodes[i] = viewNode;
        setState((prevState) => ({
            ...prevState,
            graph,
        }));
    };

    // Node 'mouseUp' handler
    const onSelectNode = (viewNode: INode | null, event: any) => {
        if (!event || !event.target) return;

        const { id = "" } = event.target;
        const e = event as Event & { target: HTMLInputElement };
        if (id.includes("text") && e && e.target) {
            const d = document.getElementById(e.target.id);
            if (d) d.click();
        }
        openModal();
        // Deselect events will send Null viewNode
        setState((prevState) => ({
            ...prevState,
            selected: viewNode,
        }));
    };

    // Edge 'mouseUp' handler
    const onSelectEdge = (viewEdge: IEdge) => {
        setState((prevState) => ({
            ...prevState,
            selected: viewEdge,
        }));
    };

    // Updates the graph with a new node
    const onCreateNode = (x: number, y: number) => {
        const graph = state.graph;
        // This is just an example - any sort of logic
        // could be used here to determine node type
        // There is also support for subtypes. (see 'sample' above)
        // The subtype geometry will underlay the 'type' geometry for a node
        const type = Math.random() < 0.25 ? BRANCH_TYPE : WORKER_TYPE;
        const viewNode = {
            id: Date.now(),
            title: "",
            type,
            x,
            y,
        };
        graph.nodes = [...graph.nodes, viewNode];
        setState((prevState) => ({
            ...prevState,
            graph,
        }));
    };

    // Deletes a node from the graph
    const onDeleteNode = (viewNode: any, nodeId: string, nodeArr: any[]) => {
        const graph = state.graph;
        // Delete any connected edges
        const newEdges = graph.edges.filter((edge, i) => {
            return (
                edge.source !== viewNode[NODE_KEY] &&
                edge.target !== viewNode[NODE_KEY]
            );
        });
        graph.nodes = nodeArr;
        graph.edges = newEdges;
        setState((prevState) => ({
            ...prevState,
            graph,
            selected: null,
        }));
    };

    // Creates a new node between two edges
    const onCreateEdge = (sourceViewNode: INode, targetViewNode: INode) => {
        const graph = state.graph;
        // This is just an example - any sort of logic
        // could be used here to determine edge type
        const type = NORMAL_EDGE_TYPE;

        const viewEdge = {
            source: sourceViewNode[NODE_KEY],
            target: targetViewNode[NODE_KEY],
            type,
        };

        // Only add the edge when the source node is not the same as the target
        if (viewEdge.source !== viewEdge.target) {
            graph.edges = [...graph.edges, viewEdge];
            setState((prevState) => ({
                ...prevState,
                graph,
                selected: viewEdge,
            }));
        }
    };

    // Called when an edge is reattached to a different target.
    const onSwapEdge = (
        sourceViewNode: INode,
        targetViewNode: INode,
        viewEdge: IEdge
    ) => {
        const graph = state.graph;
        const i = getEdgeIndex(viewEdge);
        const edge = JSON.parse(JSON.stringify(graph.edges[i]));

        edge.source = sourceViewNode[NODE_KEY];
        edge.target = targetViewNode[NODE_KEY];
        graph.edges[i] = edge;
        // reassign the array reference if you want the graph to re-render a swapped edge
        graph.edges = [...graph.edges];

        setState((prevState) => ({
            ...prevState,
            graph,
            selected: edge,
        }));
    };

    // Called when an edge is deleted
    const onDeleteEdge = (viewEdge: IEdge, edges: IEdge[]) => {
        const graph = state.graph;

        graph.edges = edges;
        setState((prevState) => ({
            ...prevState,
            graph,
            selected: null,
        }));
    };

    const onUndo = () => {
        // Not implemented
        console.warn("Undo is not currently implemented in the example.");
        // Normally any add, remove, or update would record the action in an array.
        // In order to undo it one would simply call the inverse of the action performed. For instance, if someone
        // called onDeleteEdge with (viewEdge, i, edges) then an undelete would be a splicing the original viewEdge
        // into the edges array at position i.
    };

    const onCopySelected = () => {
        if (state.selected?.source) {
            console.warn(
                "Cannot copy selected edges, try selecting a node instead."
            );
            return;
        }
        if (state.selected) {
            const x = state?.selected.x + 10;
            const y = state?.selected.y + 10;
            setState((prevState) => ({
                ...prevState,
                copiedNode: { ...state.selected, x, y },
            }));
        }
    };

    // const onPasteSelected = () => {
    //   if (!state.copiedNode)
    //     console.warn("No node is currently in the copy queue. Try selecting a node and copying it with Ctrl/Command-C");

    //   const graph = state.graph;
    //   const newNode = { ...state.copiedNode, id: Date.now() };
    //   graph.nodes = [...graph.nodes, newNode];
    //   setState(prevState => ({...prevState})) // this.forceUpdate();
    // };

    const handleChangeLayoutEngineType = (
        event: Event & { target: HTMLInputElement }
    ) => {
        setState((prevState) => ({
            ...prevState,
            layoutEngineType: event.target.value,
        }));
    };

    // TODO: idk what this does
    // onSelectPanNode = event => {
    //   if (this.GraphView) {
    //     this.GraphView.panToNode(event.target.value, true);
    //   }
    // };

    /* Define custom graph editing methods here */
    const nodes = state.graph.nodes;
    const edges = state.graph.edges;
    const selected = state.selected;

    return (
        <div id="graph" style={{ height: "100vh" }}>
            <GraphView
                data-test="graph-view"
                showGraphControls={true}
                gridSize={100}
                gridDotSize={1}
                ref={customNodeRef}
                nodeKey={NODE_KEY}
                nodes={nodes}
                edges={edges}
                selected={selected}
                nodeTypes={nodeConfig.NodeTypes}
                nodeSubtypes={nodeConfig.NodeSubtypes}
                edgeTypes={nodeConfig.NodeTypes}
                onSelectNode={onSelectNode}
                onCreateNode={onCreateNode}
                onUpdateNode={onUpdateNode}
                onDeleteNode={onDeleteNode}
                onSelectEdge={onSelectEdge}
                onCreateEdge={onCreateEdge}
                onSwapEdge={onSwapEdge}
                onDeleteEdge={onDeleteEdge}
                readOnly={false}
            />
        </div>
    );
};

export default Graph;
