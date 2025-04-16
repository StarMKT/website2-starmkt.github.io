document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const iconWrapper = document.querySelector('.icon-wrapper');
    const navMenu = document.querySelector('.nav-menu');
    const closeBtn = document.querySelector('.close-btn');

    // Toggle menu and icon state
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking the close button
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Function to determine which section is under the nav-toggle
    function updateIconColor() {
        // Get the bounding rectangle of the nav-toggle
        const navRect = navToggle.getBoundingClientRect();
        const navY = navRect.top + navRect.height / 2; // Center of the nav-toggle

        // Get all sections
        const sections = document.querySelectorAll('section');
        let currentSection = null;

        // Find the section that is currently under the nav-toggle
        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionBottom = sectionRect.bottom;

            // Check if the nav-toggle's Y position is within the section's bounds
            if (navY >= sectionTop && navY <= sectionBottom) {
                currentSection = section;
            }
        });

        // If no section is found (e.g., at the very top or bottom), default to black
        if (!currentSection) {
            iconWrapper.classList.remove('white', 'red');
            iconWrapper.classList.add('black');
            console.log('No section detected, defaulting to black');
            return;
        }

        // Log the detected section for debugging
        console.log('Detected section:', currentSection.id);

        // Special case for SECTION_11: set icon color to red
        if (currentSection.id === 'SECTION_11') {
            iconWrapper.classList.remove('black', 'white');
            iconWrapper.classList.add('red');
            console.log('SECTION_11 detected, icon color: red');
            return;
        }

        // Sections with known dark backgrounds (excluding SECTION_11)
        const darkSections = ['SECTION_5', 'SECTION_10'];
        if (darkSections.includes(currentSection.id)) {
            iconWrapper.classList.remove('black', 'red');
            iconWrapper.classList.add('white');
            console.log('Dark section detected, icon color: white');
        } else {
            iconWrapper.classList.remove('white', 'red');
            iconWrapper.classList.add('black');
            console.log('Light section detected, icon color: black');
        }
    }

    // Throttle the scroll event to improve performance
    let isThrottled = false;
    window.addEventListener('scroll', () => {
        if (isThrottled) return;
        isThrottled = true;
        setTimeout(() => {
            updateIconColor();
            isThrottled = false;
        }, 100); // Throttle to 100ms
    });

    // Update icon color on resize
    window.addEventListener('resize', updateIconColor);
    // Initial check
    updateIconColor();

    // Existing loader script
    const loader = document.querySelector('.loader-overlay');
    window.addEventListener('load', () => {
        loader.classList.add('loaded');
    });
});