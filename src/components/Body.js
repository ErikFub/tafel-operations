import Sidebar from '../components/Sidebar';
import Content from './Content';
import SidebarCollapsed from '../components/SidebarCollapsed';
import { useState } from 'react';

export default function Body({ sidebar, children }) {
  const [showSidebarInNarrow, setShowSidebarInNarrow] = useState(false)

  console.log(showSidebarInNarrow)

  return (
    <div>
      {sidebar && <SidebarCollapsed onToggleSidebar={() => setShowSidebarInNarrow(!showSidebarInNarrow)} />}
      {sidebar && <Sidebar show={showSidebarInNarrow} />}
      <Content>
        {children}
      </Content>
    </div>
  );
}