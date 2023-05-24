import Sidebar from '../components/Sidebar';
import Content from './Content';
import SidebarCollapsed from '../components/SidebarCollapsed';


export default function Body({ sidebar, children }) {
  return (
    <div>
      {sidebar && <SidebarCollapsed />}
      {sidebar && <Sidebar />}
      <Content>
        {children}
      </Content>
    </div>
  );
}