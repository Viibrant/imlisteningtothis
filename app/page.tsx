import { Box, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import MyImage from "./components/MyImage";
import React from "react";

export default function Home() {
  return (
    <Box w="75%" m="auto" p={4}>
      <VStack>
        <HStack>
          <Button bgColor={"green.700"} color={"white"} _hover={{ bg: "green.900" }}>
            Authenticate
          </Button>
          <Button bgColor={"green.700"} color={"white"} _hover={{ bg: "green.900" }}>
            Get Song
          </Button>
        </HStack>
        <Heading>Generated image:</Heading>
        <MyImage src="" alt="TEST" />
      </VStack>
    </Box>
  );
}
