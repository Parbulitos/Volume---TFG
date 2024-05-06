import React from 'react';

const Tutorials = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-y-10">
            <p>Work In Progress</p>
            <div className="flex flex-row gap-2">
                <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:.7s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:.3s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:.7s]"></div>
            </div>
        </div>
    );
};

export default Tutorials;
