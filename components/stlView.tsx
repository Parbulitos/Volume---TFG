import React from "react";

import { StlViewer } from "react-stl-viewer";

interface StlViewProps {
    fileUrl: string;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
    scale?: number;
  }

const StlView = ({ fileUrl, rotationX=0, rotationY=0, rotationZ=0, scale=1.5 }: StlViewProps) => {
  return (
      <StlViewer
        className="w-full h-full"
        url={fileUrl}
        orbitControls
        modelProps={{
          scale: scale,
          color: "#a78bfa",
          positionX: 0,
          positionY: 0,
          rotationX: rotationX,
          rotationY: rotationY,
          rotationZ: rotationZ
        }}
      />
  );
};

export default StlView;