import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface PosterProps {
  imageUrl: string;
  width: number | string; // Puedes pasar un número (px) o un string (por ej., '100%', '30rem')
  height: number | string;
  url: string;
}

const Poster: React.FC<PosterProps> = ({ imageUrl, width, height, url }) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    willChange: "transform",
  });

  const lastInvocation = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const now = Date.now();
      if (now - lastInvocation.current < 100) return;
      lastInvocation.current = now;

      const { clientWidth: width, clientHeight: height } = e.currentTarget;
      const layerX = e.nativeEvent.offsetX;
      const layerY = e.nativeEvent.offsetY;

      const yRotation = ((layerX - width / 2) / width) * 40;
      const xRotation = -((layerY - height / 2) / height) * 40;

      const str = `perspective(500px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

      setStyle({ ...style, transform: str });
    },
    [style]
  );

  const handleMouseOut = () => {
    setStyle({
      ...style,
      transform: "perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)",
      willChange: "auto",
    });
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%",
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    position: "relative",
  };

  return (
    <Link href={url}>
      <div
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        style={containerStyle}
        className="overflow-hidden bg-transparent"
      >
        <div
          style={style}
          className="w-full h-full absolute top-0 left-0 transition-transform duration-700 ease-out"
        >
          <Image src={imageUrl} alt="Poster" fill quality={100} />
        </div>
      </div>
    </Link>
  );
};

export default Poster;