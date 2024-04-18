import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PosterProps {
    imageUrl: string;
    url: string;
}

const Poster = ({ imageUrl, url }: PosterProps) => {
    const [style, setStyle] = useState<React.CSSProperties>({
        willChange: 'transform',
    });

    const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

    useEffect(() => {
        const handleResize = () => {
            window.innerWidth > 768
                ? setDimensions({ width: 600, height: 600 })
                : setDimensions({ width: 200, height: 200 });
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const lastInvocation = useRef<number>(0);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const now = Date.now();
            if (now - lastInvocation.current < 100) return;
            lastInvocation.current = now;

            const { clientWidth: width, clientHeight: height } = e.currentTarget;
            const layerX = e.nativeEvent.offsetX;
            const layerY = e.nativeEvent.offsetY;

            const yRotation = ((layerX - dimensions.width / 2) / dimensions.width) * 40;
            const xRotation = -((layerY - dimensions.height / 2) / dimensions.height) * 40;

            const str = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

            setStyle({ ...style, transform: str });
        },
        [dimensions.height, dimensions.width, style]
    );

    const handleMouseOut = () => {
        setStyle({
            ...style,
            transform: 'perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)',
            willChange: 'auto',
        });
    };

    const containerStyle: React.CSSProperties = {
        maxWidth: '100%',
        maxHeight: '100%',
        width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
        height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : dimensions.height,
        position: 'relative',
    };

    return (
        <Link href={url}>
            <div
                onMouseMove={handleMouseMove}
                onMouseOut={handleMouseOut}
                style={containerStyle}
                className='overflow-hidden bg-transparent'
            >
                <div
                    style={style}
                    className='w-full h-full absolute top-0 left-0 transition-transform duration-700 ease-out'
                >
                    <Image src={imageUrl} alt='Poster' fill quality={100} />
                </div>
            </div>
        </Link>
    );
};

export default Poster;
