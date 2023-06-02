import Sidebar from '../components/Sidebar';
import Content from './Content';
import SidebarCollapsed from '../components/SidebarCollapsed';
import { useEffect, useRef, useState } from 'react';

export default function Body({ sidebar, children }) {
	const [showSidebarInNarrow, setShowSidebarInNarrow] = useState(false)

	const menuRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setShowSidebarInNarrow(false);
		}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div>
		<div ref={menuRef}>
			{sidebar && <SidebarCollapsed onToggleSidebar={() => setShowSidebarInNarrow(!showSidebarInNarrow)} />}
			{sidebar && <Sidebar showInNarrow={showSidebarInNarrow} onItemClick={() => setShowSidebarInNarrow(false)} />}
		</div>
		<Content>
			{children}
		</Content>
		</div>
	);
}