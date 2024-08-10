document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    } else {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle('dark', prefersDarkScheme);
    }
    
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateIcon(isDarkMode);
    });

    const updateIcon = (isDarkMode) => {
        themeToggleButton.innerHTML = isDarkMode
            ? '<i class="fas fa-moon"></i>'
            : '<i class="fas fa-sun"></i>';
    };

    updateIcon(document.documentElement.classList.contains('dark'));
});