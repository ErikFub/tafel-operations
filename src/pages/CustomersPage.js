import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import SidebarCollapsed from '../components/SidebarCollapsed';


export default function CustomersPage() {
  return (
    <div>
      <SidebarCollapsed />
      <Sidebar />
      <Main />
    </div>
  );
}