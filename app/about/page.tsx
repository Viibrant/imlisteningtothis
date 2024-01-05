import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <Box w="50%" m="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        About
      </Heading>
      <Text>
        This application allows users to authenticate with the Spotify API to generate an image that
        includes data about the song they&apos;re listening to. They can then share this image with
        their friends.
      </Text>
    </Box>
  );
};

export default About;
