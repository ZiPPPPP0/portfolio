// Navigation
const navItems = document.querySelectorAll('.nav-item:not(.disabled)');
const sections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = item.getAttribute('href').substring(1);

        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Update active section
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Support clavier
document.addEventListener('keydown', (e) => {
    const activeNav = document.querySelector('.nav-item.active');
    const currentIndex = Array.from(navItems).indexOf(activeNav);

    if (e.key === 'ArrowDown' && currentIndex < navItems.length - 1) {
        e.preventDefault();
        navItems[currentIndex + 1].click();
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        navItems[currentIndex - 1].click();
    }
});
