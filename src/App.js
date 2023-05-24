import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import SidebarCollapsed from './components/SidebarCollapsed';


function App() {
  return (
    <div>
      <SidebarCollapsed></SidebarCollapsed>
      <Sidebar></Sidebar>
      <Main>
        <h1>Tafel Operations App</h1>
      </Main>
    </div>
  );
}

export default App;
