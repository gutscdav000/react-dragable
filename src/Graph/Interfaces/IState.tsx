import { Graph } from './IGraph';
import { INode, IEdge } from 'react-digraph';

export interface State {
    graph: Graph,
    selected: INode | IEdge | null,
};