"use client";
import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Link, Button, useToast } from "@chakra-ui/react";
import { PiWaveformBold } from "react-icons/pi";
import { getSpotifyUserProfile } from "@/services/spotifyService";
import { useSpotifyAuth } from "@/contexts/SpotifyAuthContext";
import Signout from "@/app/components/Signout";

export default function Navbar() {
  const { isAuth, authState } = useSpotifyAuth();
  const toast = useToast();
  const [userName, setUserName] = useState("");

  const handleSpotifyConnect = () => {
    //TODO: Authenticate Spotify
    setUserName("SpotifyUser");
  };

  // Fetch the user's profile when the component mounts
  useEffect(() => {
    if (isAuth() && authState.accessToken) {
      getSpotifyUserProfile(authState.accessToken)
        .then((data) => {
          setUserName(data.display_name);
        })
        .catch((error) => {
          console.error("Error fetching Spotify user profile:", error);
          // Display a toast with the error message
          toast({
            title: "Profile Fetch Error",
            description:
              "Unable to fetch your Spotify profile. Please try again.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
          });
        });
    }
  }, [authState.accessToken, isAuth, toast]);

  return (
    <Box bgColor={"#805AD5"} color="white" py={4}>
      <Flex
        maxW="container.lg"
        mx="auto"
        px={4}
        align="center"
        justify="space-between"
      >
        <Link href="/">
          <Text fontSize="4xl" fontWeight="bold">
            {"Im Listening to This"}
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
          {isAuth() ? (
            <>
              <Text mx={2}>Welcome, {userName}</Text>
              <Signout />
            </>
          ) : (
            <Button colorScheme="purple" onClick={handleSpotifyConnect}>
              Connect with Spotify
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
