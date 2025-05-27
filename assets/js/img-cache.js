const imageList = [
    'assets/images/SECTION_1.png',
    'assets/images/SECTION_2.png',
    'assets/images/SECTION_3.png',
    'assets/images/SECTION_4.png',
    'assets/images/SECTION_5.png',
    'assets/images/SECTION_6.jpg',
    'assets/images/SECTION_7.png',
    'assets/images/SECTION_8.png',
    'assets/images/SECTION_9.png',
    'assets/images/SECTION_10.png',
    'assets/images/SECTION_11.png',
    'assets/images/WHITE_STARS.gif',
    'assets/images/CEO.png',
    'assets/images/loader.gif',
    'assets/images/favicon.png'
];

function loadCachedImages() {
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (src && imageList.includes(src)) {
            const cacheKey = 'cache-' + src;
            const cached = localStorage.getItem(cacheKey);

            if (cached) {
                img.src = cached;
                console.log(`✅ Img loaded from cache: ${src}`);
            } else {
                fetchAndCacheImage(src, img);
            }
        }
    });
}

function fetchAndCacheImage(src, imgElement) {
    fetch(src)
        .then(res => res.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64data = reader.result;
                try {
                    localStorage.setItem('cache-' + src, base64data);
                    imgElement.src = base64data;
                    console.log(`📦 Image saved on cache: ${src}`);
                } catch (e) {
                    console.warn('⚠️ Unsuficient localStorage space. Cleaning cache...');
                    localStorage.clear();
                }
            }
            reader.readAsDataURL(blob);
        })
        .catch(err => {
            console.error(`❌ Loading fail ${src}:`, err);
        });
}

window.addEventListener('load', loadCachedImages);
