import React from 'react';

import { StlViewer } from 'react-stl-viewer';

type StlViewProps = {
    fileUrl: string;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
    scale?: number;
};

const StlView = ({
    fileUrl,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    scale = 1,
}: StlViewProps) => {
    return (
        <StlViewer
            className="h-full w-full"
            url={fileUrl}
            orbitControls
            modelProps={{
                scale,
                color: '#a78bfa',
                positionX: 0,
                positionY: 0,
                rotationX,
                rotationY,
                rotationZ,
            }}
        />
    );
};

export default StlView;
