import { ChakraProvider } from '@chakra-ui/react';

import { DropContextProvider } from './contexts/DropContext';
import { Home } from './pages/Home';

export function App() {
  return (
    <ChakraProvider>
      <DropContextProvider>
        <Home />
      </DropContextProvider>
    </ChakraProvider>
  );
}
