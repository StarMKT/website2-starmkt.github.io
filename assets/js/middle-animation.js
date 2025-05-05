(function () {
    const txt1 = 'A AGÊNCIA QUE,';
    const txt2 = 'Criou a maior campanha do varejo alimentar do mundo.';
    const speed = 30;

    const l1 = document.getElementById('line1');
    const l2 = document.getElementById('line2');
    const c1 = document.querySelector('.c1');
    const c2 = document.querySelector('.c2');
    const section = document.getElementById('SECTION_4');

    let started = false, i1 = 0, i2 = 0;

    function typeLine1() {
        c1.style.display = 'inline-block';
        if (i1 < txt1.length) {
            l1.textContent += txt1[i1++];
            setTimeout(typeLine1, speed);
        } else {
            typeLine2();                   // start second line
        }
    }

    function typeLine2() {
        c2.style.display = 'inline-block';
        if (i2 < txt2.length) {
            c2.style.display = 'inline-block'; // show second cursor while typing
            l2.textContent += txt2[i2++];
            setTimeout(typeLine2, speed);
        } else {
        }
    }

    function maybeStart() {
        if (started) return;
        const r = section.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh && r.bottom > 0) {
            started = true;
            typeLine1();
        }
    }

    window.addEventListener('load', maybeStart);
    window.addEventListener('scroll', maybeStart);
})();
