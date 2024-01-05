"use client";
import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
const MyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box>
      {isLoading && <Skeleton height="200px" width="500px" />}
      <Image src={src} alt={alt} onLoad={handleImageLoad} display={isLoading ? "none" : "block"} />
    </Box>
  );
};

export default MyImage;
