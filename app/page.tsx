"use client";
import { Box, Button, HStack, Heading, VStack } from "@chakra-ui/react";
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

  return (
    <Box w="75%" m="auto" p={4}>
      <VStack>
        <HStack>
          <Button colorScheme="purple">Authenticate</Button>
          <Button colorScheme="purple">Get Song</Button>
        </HStack>

        <Heading>Generated image:</Heading>
        <MyImage src="" alt="TEST" />
        <Stepper index={activeStep} w={"75%"} colorScheme="purple" mt={50}>
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
      </VStack>
    </Box>
  );
}
