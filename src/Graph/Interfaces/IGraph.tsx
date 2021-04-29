import {
    INode,
    IEdge
  } from "react-digraph";

export interface Graph {
    edges: IEdge[],
    nodes: INode[],
};