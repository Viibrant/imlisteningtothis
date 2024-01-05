"use client";
import { Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

const MyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Skeleton height="200px" />}
      <Image src={src} alt={alt} onLoad={handleImageLoad} display={isLoading ? "none" : "block"} />
    </>
  );
};

export default MyImage;
