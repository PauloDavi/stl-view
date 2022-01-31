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

interface DropContextProps {
  isDragging: boolean;
  isValidFormat: boolean;
  fileUrl?: string;
  clearFile(): void;
}

const DropContext = createContext({} as DropContextProps);

interface DropContextProviderProps {
  children: ReactNode;
}

export function DropContextProvider({ children }: DropContextProviderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>();

  const dragCounter = useRef(0);

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

  const handleDrop = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dragCounter.current = 0;
      const file = (event as DragEvent).dataTransfer.files[0];
      if (file.type === 'model/stl') {
        setFileUrl(URL.createObjectURL(file));
      }
    }
  }, []);

  const clearFile = useCallback(() => {
    setFileUrl(undefined);
  }, []);

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
        clearFile,
      }}
    >
      {children}
    </DropContext.Provider>
  );
}

export function UseDrop() {
  return useContext(DropContext);
}
