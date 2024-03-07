// app/providers.tsx
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { SpotifyAuthProvider } from '../contexts/SpotifyAuthContext'; // Ensure the path is correct

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SpotifyAuthProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </SpotifyAuthProvider>
  );
}
