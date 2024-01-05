import { Box, Flex, Text, Link } from "@chakra-ui/react";
import React from "react";
const Header: React.FC = () => {
  return (
    <Box bg="gray.800" color="white" py={4}>
      <Flex maxW="container.lg" mx="auto" px={4} align="center" justify="space-between">
        <Link href="/">
          <Text fontSize="lg" fontWeight="bold">
            ImListeningToThis
          </Text>
        </Link>
        <Flex>
          <Link href="/" mx={2}>
            Home
          </Link>
          <Link href="/about" mx={2}>
            About
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
