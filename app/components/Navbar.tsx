"use client";
import { Box, Flex, Text, Link, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { PiWaveformBold } from "react-icons/pi";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSpotifyConnect = () => {
    //TODO: Spotify authentication logic
    setIsAuthenticated(true);
    setUserName("SpotifyUser");
  };

  return (
    <Box bgColor={"#805AD5"} color="white" py={4}>
      <Flex maxW="container.lg" mx="auto" px={4} align="center" justify="space-between">
        <Link href="/">
          <Text fontSize="4xl" fontWeight="bold">
            I'm Listening to This
            <PiWaveformBold
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginLeft: "10px",
                fontSize: "30px",
              }}
            />
          </Text>
        </Link>
        <Flex align="center">
          <Link href="/" mx={2}>
            Home
          </Link>
          <Link href="/about" mx={2}>
            About
          </Link>
          {isAuthenticated ? (
            <Text mx={2}>Welcome, {userName}</Text>
          ) : (
            <Button colorScheme="purple" onClick={handleSpotifyConnect}>
              Connect with Spotify
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};