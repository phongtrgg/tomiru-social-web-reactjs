import React, { useState } from "react";
import Tree from "react-d3-tree";

interface OrgChartTreeProps {
    nodeSize: { x: number; y: number };
    translate: { x: number; y: number };
    data?: any;
    action?: (email: string) => void;
}
const OrgChartTree: React.FC<OrgChartTreeProps> = ({ nodeSize, translate, data, action }) => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    const renderCustomNodeElement = ({ nodeDatum }: any) => (
        <g
            onMouseEnter={() => setHoveredNode(nodeDatum.attributes.email)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => {
                if (action && nodeDatum.attributes.email) {
                    action(nodeDatum.attributes.email);
                }
            }}
        >
            <circle r={20} fill="#93D1FB" stroke="#ffffff" strokeWidth="2" />
            {hoveredNode === nodeDatum.attributes.email && (
                <>
                    <text className="node-name" dy={-10}>
                        {nodeDatum.name}
                    </text>
                    <text className="node-email" dy={10}>
                        {nodeDatum.attributes?.email || "No email"}
                    </text>
                </>
            )}
        </g>
    );

    return (
        <div
            id="treeWrapper"
            style={{
                width: "100%",
                height: "150vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {data ? (
                <Tree
                    data={data}
                    orientation="vertical"
                    zoomable={false}
                    translate={translate}
                    draggable={false}
                    collapsible={false}
                    nodeSize={nodeSize}
                    renderCustomNodeElement={renderCustomNodeElement}
                />
            ) : (
                <p>No data available</p>
            )}
            <style>{`
                .rd3t-link {
                    stroke: #d3d3d3 !important;
                    stroke-width: 2px;
                }
                .rd3t-node {
                    stroke: #000000;
                    cursor: pointer !important;
                    fontWeight: 300 ;
                    font-size: 12px !important;
                }
                .rd3t-node circle {
                    fill: #93D1FB;
                }
                .custom-node rect {
                    cursor: pointer;
                }
                .rd3t-leaf-node {
                    cursor: pointer;
                    stroke: #000000;
                }
                .rd3t-leaf-node circle {
                    fill: #93D1FB;
                }

                .node-name, .node-email {
                    fill: #868e96;
                    text-anchor: middle;
                    font-weight: normal;
                }
            `}</style>
        </div>
    );
};

export default OrgChartTree;
