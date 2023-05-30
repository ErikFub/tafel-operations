import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage';
import SuppliersPage from './pages/SuppliersPage';
import TafelApiProvider from './contexts/ApiProvider';
import { ToastContextProvider } from './contexts/ToastContext';
import RoutingPage from './pages/RoutingPage';
import RouteDetailsPage from './pages/RouteDetailsPage';


function App() {
  return (
    <BrowserRouter>
      <TafelApiProvider>
        <ToastContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/routing" element={<RoutingPage />} />
            <Route path="/routing/routes/:id" element={<RouteDetailsPage />}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ToastContextProvider>
      </TafelApiProvider>
    </BrowserRouter>
  );
}

export default App;
