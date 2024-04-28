import React from 'react';

const Tutorials = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-10">
            <p>Work In Progress</p>
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
            </div>
        </div>
    );
};

export default Tutorials;
