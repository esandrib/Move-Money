import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Initiative } from "../data/initiatives";

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-800",
  "Risk & Compliance": "bg-red-100 text-red-800",
  Operations: "bg-orange-100 text-orange-800",
  Finance: "bg-green-100 text-green-800",
  Product: "bg-purple-100 text-purple-800",
};

const priorityDot: Record<string, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-400",
  Medium: "bg-yellow-400",
  Low: "bg-gray-400",
};

function formatCost(cost: number | null): string {
  if (cost === null) return "—";
  if (cost >= 1_000_000) return `$${(cost / 1_000_000).toFixed(2)}M`;
  if (cost >= 1_000) return `$${(cost / 1_000).toFixed(0)}K`;
  return `$${cost}`;
}

export type InitiativeNodeData = Initiative & { [key: string]: unknown };

export function InitiativeNode({ data }: NodeProps) {
  const initiative = data as InitiativeNodeData;
  const catColor = categoryColors[initiative.category] ?? "bg-gray-100 text-gray-700";
  const dotColor = priorityDot[initiative.priority] ?? "bg-gray-400";

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 w-60 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Target handle – top */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Header */}
      <div className="bg-slate-800 px-3 py-2 flex items-start gap-2">
        <span className={`mt-1 shrink-0 w-2 h-2 rounded-full ${dotColor}`} />
        <span className="text-white text-sm font-semibold leading-tight">
          {initiative.name}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 py-2 space-y-2">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${catColor}`}
          >
            {initiative.category}
          </span>
          <span className="text-xs text-gray-400">{initiative.id}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Total Cost</span>
          <span className="font-semibold text-gray-800">
            {formatCost(initiative.totalCost)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="text-gray-700">{initiative.status}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Owner</span>
          <span className="text-gray-700">{initiative.owner}</span>
        </div>
      </div>

      {/* Source handle – bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
