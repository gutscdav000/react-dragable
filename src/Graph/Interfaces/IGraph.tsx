import {
    INode,
    IEdge
  } from "react-digraph";

export interface IGraph {
    edges: IEdge[],
    nodes: INode[],
};