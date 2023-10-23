import { useState, useEffect } from 'react';

export function useSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  useEffect(() => {
    // Add any additional logic related to the sidebar, if needed
    // For example, you can close the sidebar when the user clicks outside of it
    const handleOutsideClick = (event) => {
      // Check if the click is outside the sidebar
      if (sidebarOpen && event.target.closest('.sidebar') === null) {
        setSidebarOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [sidebarOpen]);

  return {
    sidebarOpen,
    toggleSidebar,
  };
}