import { Box, Button, Center, HStack, Heading, VStack } from "@chakra-ui/react";
import MyImage from "./components/MyImage";
import React from "react";

export default function Home() {
  return (
    <Box w="75%" m="auto" p={4}>
      <VStack>
        <HStack>
          <Button colorScheme="blue">Authenticate</Button>
          <Button colorScheme="green">Get Song</Button>
        </HStack>
        <Heading>Generated image:</Heading>
        <MyImage src="" alt="TEST" />
      </VStack>
    </Box>
  );
}
