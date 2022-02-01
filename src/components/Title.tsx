import { Text } from '@chakra-ui/react';

export function Title() {
  return (
    <Text
      as="h1"
      color="#f2f2f2"
      fontSize="4xl"
      fontWeight="bold"
      position="absolute"
      top="5"
      left="5"
      zIndex="1"
    >
      STL View
    </Text>
  );
}
