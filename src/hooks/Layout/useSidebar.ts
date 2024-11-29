import { useState } from 'react';

export const useSidebar = () => {
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleMenu = (path: string) => {
        setOpenMenus((prev) =>
            prev.includes(path) ? prev.filter((item) => item !== path) : [...prev, path]
        );
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return {
        openMenus,
        isSidebarOpen,
        toggleMenu,
        toggleSidebar,
    };
};
