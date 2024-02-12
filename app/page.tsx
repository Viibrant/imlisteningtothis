"use client";
import { Box, Button, ButtonGroup, Heading, VStack, Text } from "@chakra-ui/react";
import MyImage from "./components/MyImage";
import { handleAuthenticate } from "./pkce";
import React, { useState, useEffect } from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Divider,
} from "@chakra-ui/react";
import { useSteps } from "@chakra-ui/react";

export default function Home() {
  const steps: { title: string; description?: string }[] = [
    { title: "Authenticate with Spotify" },
    { title: "Get Song", description: "Play a song on Spotify" },
    { title: "Generate Image" },
    { title: "Done", description: "Share your image!" },
  ];
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const [currentSong, setCurrentSong] = useState<string | null>(null);

  // Function to fetch the current playing song
  const getCurrentSong = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("User not authenticated.");
      return;
    }

    // Fetch current playing song using the access token
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (response.status === 204 || response.status > 400) {
          throw new Error('No content or error');
        }
        return response.json();
      })
      .then(data => {
        console.log('Current song:', data);
        //* This is where we process the data and display it
        setCurrentSong(data.item.name);
      })
      .catch(error => {
        console.error('Error fetching current song:', error);
        setCurrentSong("Could not fetch current song");
      });
  };

  return (
    <Box w="75%" m="auto">
      <VStack>
        <Stepper
          index={activeStep}
          w={"75%"}
          colorScheme="purple"
          mt={5}
          mb={2}
          bg={"gray.100"}
          padding={7}
          borderRadius={10}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Divider width={"75%"} />

        {currentSong ? (
          <>
            <Heading mt={3}>Currently Playing Song</Heading>
            <Text>{currentSong}</Text>
          </>
        ) : (
          <Text>Please authenticate to see the current playing song.</Text>
        )}

        <ButtonGroup mb={2}>
          <Button colorScheme="purple" onClick={handleAuthenticate}>
            Authenticate
          </Button>
          <Button colorScheme="purple" onClick={getCurrentSong}>
            Get Song
          </Button>
        </ButtonGroup>
        <Heading mt={3}>Generated Image</Heading>
        <MyImage src="" alt="TEST" />
      </VStack>
    </Box>
  );
}
