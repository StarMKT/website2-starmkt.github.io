(function () {
    const txt1 = 'A AGÊNCIA QUE,';

    const txts = [
        { normal: 'Criou a maior campanha do varejo alimentar do mundo com o ', bold: 'Assaí!' },
        { normal: 'Gerou apetite appeal e desejo de consumo com a ', bold: 'Esfiha Imigrantes!' },
        { normal: 'Implementou o Trade Marketing no litoral paulista com a ', bold: 'Rede Litoral!' },
        { normal: 'Popularizou a NFL no Brasil com a ', bold: 'Pizza Hut!' },
        { normal: 'Revitalizou o branding para vender mais com a ', bold: 'Danny Cosméticos!' },
        { normal: 'Incentivou os benefícios para os celetistas com a ', bold: 'Ferrarezi Benefícios!' },
        { normal: 'Engajou a indústria com o cliente, aumentando as vendas com ', bold: 'Soneda!' },
        { normal: 'Gerou oportunidade de negócios em ramos do varejo com ', bold: 'Tupperware!' },
        { normal: 'Acelerou vendas com paixão com ', bold: 'Barbosa SM!' },
        { normal: 'Atravessou fronteiras desenvolvendo negócios com ', bold: 'Ar Foods!' },
        { normal: 'Realizou os sonhos de ', bold: 'vários clientes!' }
    ];

    const speed = 10;
    const delayAfterErase = 200;

    const l1 = document.getElementById('line1');
    const l2 = document.getElementById('line2');
    const c1 = document.querySelector('.c1');
    const c2 = document.querySelector('.c2');
    const section = document.getElementById('SECTION_4');
    const cutLine = document.getElementById('cut-line');

    let started = false;
    let i1 = 0;

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let typingBold = false;
    let boldElement = null;

    function typeLine1() {
        c1.style.display = 'inline-block';
        if (i1 < txt1.length) {
            l1.textContent += txt1[i1++];
            setTimeout(typeLine1, speed);
        } else {
            c1.style.display = 'none';
            setTimeout(() => {
                animateCutLine(() => {
                    setTimeout(typeDynamicLine, 300);
                });
            }, 500);
        }
    }

    function animateCutLine(callback) {
        cutLine.style.opacity = 1;
        let progress = 0;
        const animation = setInterval(() => {
            progress += 2; // control the speed
            cutLine.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(animation);
                if (callback) callback();
            }
        }, 15); // control the smoothness
    }

    function typeDynamicLine() {
        c2.style.display = 'inline-block';
        const current = txts[currentTextIndex];
        if (!typingBold) {
            if (currentCharIndex < current.normal.length) {
                l2.append(current.normal[currentCharIndex++]);
                setTimeout(typeDynamicLine, speed);
            } else {
                typingBold = true;
                currentCharIndex = 0;
                boldElement = document.createElement('strong');
                boldElement.style.fontFamily = 'Poppins Bold';
                l2.appendChild(boldElement);
                setTimeout(typeDynamicLine, speed);
            }
        } else {
            if (currentCharIndex < current.bold.length) {
                boldElement.append(current.bold[currentCharIndex++]);
                setTimeout(typeDynamicLine, speed);
            } else {
                blinkCursor(c2, 3, () => eraseDynamicLine());
            }
        }
    }

    function eraseDynamicLine() {
        const current = txts[currentTextIndex];
        const fullText = current.normal + current.bold;
        let index = fullText.length;

        const eraseInterval = setInterval(() => {
            if (index > 0) {
                index--;
                l2.innerHTML = '';

                if (index <= current.normal.length) {
                    l2.textContent = current.normal.substring(0, index);
                } else {
                    l2.textContent = current.normal;
                    const boldPart = document.createElement('strong');
                    boldPart.style.fontFamily = 'Poppins Bold';
                    boldPart.textContent = current.bold.substring(0, index - current.normal.length);
                    l2.appendChild(boldPart);
                }
            } else {
                clearInterval(eraseInterval);
                c2.style.display = 'none';
                typingBold = false;
                currentCharIndex = 0;
                currentTextIndex++;
                if (currentTextIndex >= txts.length) {
                    currentTextIndex = 0;
                }
                setTimeout(typeDynamicLine, delayAfterErase);
            }
        }, 20);
    }

    function blinkCursor(cursor, times, callback) {
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            cursor.style.visibility = (cursor.style.visibility === 'hidden') ? 'visible' : 'hidden';
            blinkCount++;
            if (blinkCount >= times * 2) {
                clearInterval(blinkInterval);
                cursor.style.visibility = 'visible';
                callback();
            }
        }, 200);
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
