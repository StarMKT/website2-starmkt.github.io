document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader-overlay');

    // When the window finishes loading all assets
    window.addEventListener('load', () => {
        // Add the 'loaded' class to trigger the vanishing animation
        loader.classList.add('loaded');
    });
});