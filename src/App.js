import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CustomersPage from './pages/CustomersPage';
import SuppliersPage from './pages/SuppliersPage';
import TafelApiProvider from './contexts/ApiProvider';


function App() {
  return (
    <BrowserRouter>
      <TafelApiProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/Customers" element={<CustomersPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </TafelApiProvider>
    </BrowserRouter>
  );
}

export default App;
