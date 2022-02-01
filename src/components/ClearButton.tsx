import { Button } from '@chakra-ui/react';

import { UseDrop } from '../contexts/DropContext';

export function ClearButton() {
  const { fileUrl, clearFile } = UseDrop();

  if (!fileUrl) return null;

  return (
    <Button
      position="absolute"
      colorScheme="teal"
      top="5"
      right="5"
      zIndex="1"
      onClick={clearFile}
    >
      Limpar
    </Button>
  );
}
