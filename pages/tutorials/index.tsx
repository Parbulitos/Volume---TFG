import React from 'react';

const Tutorials = () => {
    return (
        <div className="mt-6 flex h-screen flex-col items-center justify-center gap-y-10">
            <div className="grid grid-cols-4 justify-center gap-8">
                <h1 className="col-span-4 text-4xl font-bold text-white underline">
                    Iníciate en la impresión 3D
                </h1>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://imageio.forbes.com/specials-images/imageserve/5f1a62d942a6387efb759310/What-Can-3D-Printing-Be-Used-For--Here-Are-10-Amazing-Examples/960x0.jpg?height=473&width=711&fit=bounds"
                            alt="Impresora"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Tus primeros pasos en la impresión 3D</h2>
                        <p>Adéntrate en este impresionante mundo</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://www.printerrobots.com/wp-content/uploads/2022/12/tips-basicos-de-impresion-3d-parte-1.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Tips básicos de impresión 3D</h2>
                        <p>Ajusta tus impresiones al máximo</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://i.ytimg.com/vi/E8sZXs0Y1RU/maxresdefault.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Test imprescindibles para calibrar tu impresora
                        </h2>
                        <p>Aprende a entender los resultados</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://bitfab.io/wp-content/uploads/2020/01/Problemas-impresio%CC%81n-3D.png"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Problemas con la impresión 3D</h2>
                        <p>Reconoce los errores</p>
                    </div>
                </div>
                <h1 className="col-span-4 text-4xl font-bold text-white underline">
                    Profundiza en la impresión 3D
                </h1>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://3dwork.io/wp-content/uploads/2020/03/1406298010_1070383.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Guía completa de filamentos 3D</h2>
                        <p>Aprende sobre sus propiedades</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://i.ytimg.com/vi/KXXnWzfTQVo/maxresdefault.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Aprende a dividir STL</h2>
                        <p>Consigue que tus piezas quepan en la impresora</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://i.ytimg.com/vi/p8kdDJ1Wfjg/maxresdefault.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">¿Qué es el PID?</h2>
                        <p>Aprende a calibrarlo</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure className="h-52">
                        <img
                            src="https://i.ytimg.com/vi/28HX5Uu51CA/maxresdefault.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Configura Cura Slicer</h2>
                        <p>Crea tus propios perfiles de impresión y entiende todos los ajustes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorials;
