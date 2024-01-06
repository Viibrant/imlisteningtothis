"use client";
import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import MyImage from "./components/MyImage";
import React from "react";
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
  const steps = [
    { title: "Authenticate with Spotify" },
    { title: "Get Song", description: "Play a song on Spotify" },
    { title: "Generate Image" },
    { title: "Done", description: "Share your image!" },
  ];
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const generateRandomString = (length) => {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };
  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const handleAuthenticate = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const url = new URL("https://accounts.spotify.com/authorize");
    const clientId = "YOUR_CLIENT_ID";
    const redirectUri = "http://localhost:3000";

    const scope = "user-read-private user-read-email";
    const authUrl = new URL("https://accounts.spotify.com/authorize");
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
        <ButtonGroup mb={2}>
          <Button colorScheme="purple" onClick={handleAuthenticate}>
            Authenticate
          </Button>
          <Button colorScheme="purple">Get Song</Button>
        </ButtonGroup>
        <Divider width={"75%"} />

        <Heading mt={3}>Generated Image</Heading>
        <MyImage src="" alt="TEST" />
      </VStack>
    </Box>
  );
}
