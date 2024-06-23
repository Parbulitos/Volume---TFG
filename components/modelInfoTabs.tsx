import { Models } from '@prisma/client';
import React, { useState } from 'react';

const Tabs = (model: Models) => {
    const tabs = ['Descripción', 'Comentarios', 'Makes', 'Remixes'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="mt-[45px] w-[90%] md:w-auto">
            <div className="flex gap-4 overflow-x-auto py-2 sm:flex-wrap sm:overflow-visible">
                {tabs.map((tab, index) => (
                    <label
                        key={tab}
                        className="btn btn-outline btn-primary w-28 min-w-max whitespace-nowrap lg:w-36"
                    >
                        <input
                            type="radio"
                            name="tabs"
                            value={tab}
                            defaultChecked={index === 0}
                            className="hidden"
                            onChange={(e) => setActiveTab(e.target.value)}
                        />
                        {tab}
                    </label>
                ))}
            </div>
            <div className="mt-4">
                {/* //TODO: Crear la información de cada tab */}
                {activeTab === 'Descripción' && <div>{model.description}</div>}
                {activeTab === 'Comentarios' && <div>Contenido de Comentarios</div>}
                {activeTab === 'Makes' && <div>Contenido de Makes</div>}
                {activeTab === 'Remixes' && <div>Contenido de Remixes</div>}
            </div>
        </div>
    );
};

export default Tabs;

// import React from "react";

// const ModelInfoTabs = () => {
//     return (
//         // <>

//         <div>
//             <input type="radio" name="tabOptions" defaultChecked />
//         </div>

//         // <div role="tablist" className="tabs tabs-bordered">
//         //     <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 1" defaultChecked/>
//         //     <div role="tabpanel" className="tab-content p-10">Tab content 1</div>

//         //     <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 2" />
//         //     <div role="tabpanel" className="tab-content p-10">Tab content 2</div>

//         //     <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Tab 3" />
//         //     <div role="tabpanel" className="tab-content p-10">Tab content 3</div>
//         // </div>
//         // </>
//     );
// };

// export default ModelInfoTabs;
