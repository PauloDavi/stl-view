import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Collapse,
  IconButton,
  Flex,
} from '@chakra-ui/react';

import { UseDrop } from '../contexts/DropContext';

export function TableStlProps() {
  const { stlProps } = UseDrop();
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  if (!stlProps) return null;

  return (
    <Box
      borderRadius="md"
      bg="white"
      position="absolute"
      bottom="5"
      left="5"
      p="2"
      zIndex="1"
    >
      <Flex justifyContent="space-between" alignItems="center" gap="4">
        <Text fontWeight="bold">Informações do STL</Text>

        <IconButton
          size="sm"
          aria-label="Expandir tabela"
          colorScheme="teal"
          onClick={onToggle}
          icon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Table mt="2" variant="simple" size="sm" maxW="2xl">
          <Thead>
            <Tr>
              <Th>Propriedade</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Tamanho X</Td>
              <Td>{stlProps.xSize.toFixed(2)} mm</Td>
            </Tr>
            <Tr>
              <Td>Tamanho Y</Td>
              <Td>{stlProps.ySize.toFixed(2)} mm</Td>
            </Tr>
            <Tr>
              <Td>Tamanho Z</Td>
              <Td>{stlProps.zSize.toFixed(2)} mm</Td>
            </Tr>
            <Tr>
              <Td>Volume</Td>
              <Td>
                {stlProps.volume.toFixed(2)} mm<sup>2</sup>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Collapse>
    </Box>
  );
}
