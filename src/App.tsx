import { DropContextProvider } from './contexts/DropContext';
import { Home } from './pages/Home';

export function App() {
  return (
    <DropContextProvider>
      <Home />
    </DropContextProvider>
  );
}
