import { IGraph } from './IGraph';
import { INode, IEdge } from 'react-digraph';

export interface State {
    graph: IGraph,
    selected: INode | IEdge | null,
};