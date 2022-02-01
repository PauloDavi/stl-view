import {
  createContext,
  DragEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useToast } from '@chakra-ui/react';
import { Box3, Mesh, Vector3 } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import { getVolume } from '../utils/getVolume';

export interface StlProps {
  xSize: number;
  ySize: number;
  zSize: number;
  volume: number;
}

interface DropContextProps {
  isDragging: boolean;
  isValidFormat: boolean;
  fileUrl?: string;
  stlProps?: StlProps;
  clearFile(): void;
  handleClick(): void;
}

const DropContext = createContext({} as DropContextProps);

interface DropContextProviderProps {
  children: ReactNode;
}

export function DropContextProvider({ children }: DropContextProviderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [stlProps, setStlPropsDispatch] = useState<StlProps>();
  const [fileUrl, setFileUrl] = useState<string>();
  const toast = useToast();

  const dragCounter = useRef(0);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const setStlProps = useCallback((url?: string) => {
    if (url) {
      new STLLoader().load(url, geom => {
        const boundingBox = new Box3();

        boundingBox.setFromObject(new Mesh(geom));

        const size = boundingBox.getSize(new Vector3(0, 0, 0));

        setStlPropsDispatch({
          xSize: size.x,
          ySize: size.y,
          zSize: size.z,
          volume: getVolume(geom),
        });
      });
    } else {
      setStlPropsDispatch(undefined);
    }
  }, []);

  const showErrorToast = useCallback(() => {
    toast({
      variant: 'left-accent',
      position: 'top-right',
      title: 'Esse tipo de arquivo não é válido, selecione um .stl',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }, [toast]);

  const handleClick = useCallback(() => {
    hiddenFileInput?.current?.click();
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        if (file.type === 'model/stl') {
          const url = URL.createObjectURL(file);
          setFileUrl(url);
          setStlProps(url);
        } else {
          showErrorToast();
        }
      }
    },
    [showErrorToast, setStlProps]
  );

  const handleDrag = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragIn = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
      if (event.dataTransfer.items[0].type === 'model/stl') {
        setIsValidFormat(true);
      } else {
        setIsValidFormat(false);
      }
    }
  }, []);

  const handleDragOut = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current > 0) return;
    setIsDragging(false);
    setIsValidFormat(true);
  }, []);

  const handleDrop = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        dragCounter.current = 0;
        const file = (event as DragEvent).dataTransfer.files[0];
        if (file.type === 'model/stl') {
          const url = URL.createObjectURL(file);
          setFileUrl(url);
          setStlProps(url);
        } else {
          showErrorToast();
        }
      }
    },
    [showErrorToast, setStlProps]
  );

  const clearFile = useCallback(() => {
    setFileUrl(undefined);
    setIsDragging(false);
    setIsValidFormat(false);
    setStlProps();
  }, [setStlProps]);

  useEffect(() => {
    window.addEventListener('dragenter', handleDragIn);
    window.addEventListener('dragleave', handleDragOut);
    window.addEventListener('dragover', handleDrag);
    window.addEventListener('drop', handleDrop);
    return function cleanUp() {
      window.removeEventListener('dragenter', handleDragIn);
      window.removeEventListener('dragleave', handleDragOut);
      window.removeEventListener('dragover', handleDrag);
      window.removeEventListener('drop', handleDrop);
    };
  });

  return (
    <DropContext.Provider
      value={{
        isDragging,
        isValidFormat,
        fileUrl,
        stlProps,
        handleClick,
        clearFile,
      }}
    >
      {children}
      <input
        type="file"
        ref={hiddenFileInput}
        accept=".stl"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </DropContext.Provider>
  );
}

export function UseDrop() {
  return useContext(DropContext);
}
