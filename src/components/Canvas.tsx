import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { initiatives } from "../data/initiatives";
import { InitiativeNode, type InitiativeNodeData } from "./InitiativeNode";

const NODE_WIDTH = 240;
const NODE_HEIGHT = 170;
const COLS = 4;
const H_GAP = 60;
const V_GAP = 60;

const nodeTypes = { initiative: InitiativeNode };

const initialNodes: Node<InitiativeNodeData>[] = initiatives.map(
  (initiative, index) => {
    const col = index % COLS;
    const row = Math.floor(index / COLS);
    return {
      id: initiative.id,
      type: "initiative",
      position: {
        x: col * (NODE_WIDTH + H_GAP) + 40,
        y: row * (NODE_HEIGHT + V_GAP) + 40,
      },
      data: initiative as InitiativeNodeData,
    };
  }
);

export function Canvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState([]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{ animated: true }}
      >
        <Background color="#e2e8f0" gap={20} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const cat = (node.data as InitiativeNodeData).category;
            const map: Record<string, string> = {
              Technology: "#93c5fd",
              "Risk & Compliance": "#fca5a5",
              Operations: "#fdba74",
              Finance: "#86efac",
              Product: "#d8b4fe",
            };
            return map[cat] ?? "#cbd5e1";
          }}
          maskColor="rgba(241,245,249,0.7)"
        />
      </ReactFlow>
    </div>
  );
}
