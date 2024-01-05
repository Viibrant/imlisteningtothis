import { Box, Flex, Text, Link } from "@chakra-ui/react";
import React from "react";
import { PiWaveformBold } from "react-icons/pi";
const Header: React.FC = () => {
  return (
    <Box bgColor={"#805AD5"} color="white" py={4}>
      <Flex maxW="container.lg" mx="auto" px={4} align="center" justify="space-between">
        <Link href="/">
          <Text fontSize="2xl" fontWeight="bold">
            I&apos;m Listening to This
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
