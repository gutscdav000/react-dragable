// @flow
/*
  Copyright(c) 2018 Uber Technologies, Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
          http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/*
  Example config for GraphView component
*/
import React from "react";

export const NODE_KEY = "id"; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = "empty";
export const WORKER_TYPE = "worker"; // Empty node type
export const POLY_TYPE = "poly";
export const BRANCH_TYPE = "branch";
export const ENDPOINT_TYPE = "endpoint";
export const NORMAL_EDGE_TYPE = "normalEdge";

export const nodeTypes = [
  EMPTY_TYPE,
  WORKER_TYPE,
  POLY_TYPE,
  BRANCH_TYPE,
  ENDPOINT_TYPE,
];
export const edgeTypes = [NORMAL_EDGE_TYPE];
export const nodeSubTypes = [];

const EmptyNodeShape = (
  <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
    <circle cx="77" cy="77" r="76" />
  </symbol>
);

const WorkerShape = (
  <symbol viewBox="0 0 200 200" id="worker">
    <circle cx="100" cy="100" r="50" />
    <g>
      <foreignObject width="100%" height="100%">
        <div /*xmlns="http://www.w3.org/1999/xhtml"*/>test</div>
      </foreignObject>
    </g>
  </symbol>
);

const BranchShape = (
  <symbol viewBox="-27 0 154 154" id="branch" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" />
  </symbol>
);

const PolyShape = (
  <symbol viewBox="0 0 88 72" id="poly" width="88" height="88">
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);

const EndpointShape = (
  <symbol
    viewBox="0 0 154 54"
    width="154"
    height="54"
    id="endpoint"
  >
    <rect x="0" y="0" rx="2" ry="2" width="154" height="54" />
  </symbol>
);

const NormalEdgeShape = (
  <symbol viewBox="0 0 50 50" id="normalEdge">
    <rect
      transform="rotate(45)"
      x="27.5"
      y="-7.5"
      width="15"
      height="15"
      fill="currentColor"
    />
  </symbol>
);

export default {
  EdgeTypes: {
    normalEdge: {
      shape: NormalEdgeShape,
      shapeId: "#normalEdge"
    }
  },
  NodeSubtypes: {},
  NodeTypes: {
    empty: {
      shape: EmptyNodeShape,
      shapeId: "#empty",
      typeText: "None"
    },
    worker: {
      shape: WorkerShape,
      shapeId: "#worker",
      typeText: "Worker"
    },
    branch: {
      shape: BranchShape,
      shapeId: "#branch",
      typeText: "Branch"
    },
    endpoint: {
      shape: EndpointShape,
      shapeId: "#endpoint",
      typeText: "Endpoint"
    },
    poly: {
      shape: PolyShape,
      shapeId: "#poly",
      typeText: "Poly"
    }
  }
};
