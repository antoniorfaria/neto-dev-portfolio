document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------- */
    /* 1. SCROLL SUAVE PARA LINKS DA NAVBAR                  */
    /* ----------------------------------------------------- */
    const menuLinks = document.querySelectorAll('a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - (navHeight + 20);

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ----------------------------------------------------- */
    /* 2. EFEITO MOUSE GLOW + 3D TILT                        */
    /* ----------------------------------------------------- */
    const interactiveCards = document.querySelectorAll(
        '.small-card, .glass-pill, .cert-card, .btn-outline, .nav-arrow'
    );

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform =
                `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    /* ----------------------------------------------------- */
    /* 3. SCROLL REVEAL                                     */
    /* ----------------------------------------------------- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-hidden')
        .forEach(el => observer.observe(el));

    /* ----------------------------------------------------- */
    /* 4. MODAL CURRÍCULO                                   */
    /* ----------------------------------------------------- */
    const openBtn = document.getElementById('openCurriculo');
    const modalCurriculo = document.getElementById('curriculoModal');

    const closeModalFunc = (targetModal) => {
        targetModal.style.opacity = "0";
        setTimeout(() => {
            targetModal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    };

    openBtn?.addEventListener('click', (e) => {
        e.preventDefault();

        const pdfContainer = modalCurriculo.querySelector('.modal-content');
        const pdfPath = `${STATIC_URL}curriculo.pdf`;

        pdfContainer.innerHTML = `
            <span class="closeModal">&times;</span>
            <embed src="${pdfPath}" type="application/pdf" width="100%" height="100%">
        `;

        pdfContainer.querySelector('.closeModal')
            .onclick = () => closeModalFunc(modalCurriculo);

        modalCurriculo.style.display = "flex";
        setTimeout(() => modalCurriculo.style.opacity = "1", 10);
        document.body.style.overflow = "hidden";
    });

    /* ----------------------------------------------------- */
    /* 5. MODAL CERTIFICADOS ADS                            */
    /* ----------------------------------------------------- */
    const certADS = document.getElementById('certADS');
    const modalFortinet = document.getElementById('modalFortinet');
    const pdfViewer = document.getElementById('pdf-viewer');
    const certCounter = document.getElementById('certCounter');
    const prevCert = document.getElementById('prevCert');
    const nextCert = document.getElementById('nextCert');

    const listaCertificados = [
        "cert_01.pdf",
        "cert_02.pdf",
        "cert_03.pdf",
        "cert_04.pdf",
        "cert_05.pdf",
        "cert_06.pdf"
    ];

    let certAtual = 0;

    function renderCertificado() {
        const arquivo = listaCertificados[certAtual];
        pdfViewer.innerHTML = `
            <embed src="${STATIC_URL}certificados/${encodeURIComponent(arquivo)}"
                   type="application/pdf"
                   width="100%"
                   height="100%">
        `;
        certCounter.innerText = `${certAtual + 1} / ${listaCertificados.length}`;
    }

    certADS?.addEventListener('click', () => {
        certAtual = 0;
        modalFortinet.style.display = "flex";
        setTimeout(() => modalFortinet.style.opacity = "1", 10);
        document.body.style.overflow = "hidden";
        renderCertificado();
    });

    nextCert?.addEventListener('click', () => {
        certAtual = (certAtual + 1) % listaCertificados.length;
        renderCertificado();
    });

    prevCert?.addEventListener('click', () => {
        certAtual = (certAtual - 1 + listaCertificados.length) % listaCertificados.length;
        renderCertificado();
    });

    document.querySelector('.closeModalFortinet')
        ?.addEventListener('click', () => closeModalFunc(modalFortinet));

   /* ----------------------------------------------------- */
/* 6. MODAL ROBÔ BETA                                   */
/* ----------------------------------------------------- */
const openRoboBeta = document.getElementById('openRoboBeta');
const btnRoboVerMais = document.getElementById('btnRoboVerMais'); // novo botão
const modalRoboBeta = document.getElementById('modalRoboBeta');
const roboViewer = document.getElementById('roboViewer');
const roboDownloads = document.getElementById('roboDownloads');
const roboCounter = document.getElementById('roboCounter');
const prevRobo = document.getElementById('prevRobo');
const nextRobo = document.getElementById('nextRobo');

const roboBetaPath = encodeURIComponent("Robô BETA — 4° lugar");

const imagensRoboBeta = [
    "inicial.jpeg",   // agora a imagem inicial aparece primeiro
    "certrob_01_1.jpg",
    "certrob_01_2.jpg",
    "robo_02.jpeg",
    "robo_03.jpeg",
    "robo_04.jpeg"
];

const arquivosRoboBeta = [
    "Cupim2.0.dxf",
    "Configuracoes_para_Impressao_do_Cupim.docx",
    "Manual_FS-i6_Antonio.pdf",
    "engrenagemmaior3of.stl",
    "engrenagemMenor.pdf",
    "engrenagemmenor-CorpInvoluteGear.stl",
    "pecarodav4.stl",
    "RampaPPnnen.stl"
];

let roboAtual = 0;

function renderRoboBeta() {
    roboViewer.innerHTML = `
        <img src="${STATIC_URL}${roboBetaPath}/${encodeURIComponent(imagensRoboBeta[roboAtual])}">
    `;
    roboCounter.innerText = `${roboAtual + 1} / ${imagensRoboBeta.length}`;

    roboDownloads.innerHTML = `
        <h4>Arquivos do Projeto</h4>
        ${arquivosRoboBeta.map(a => `
            <a href="${STATIC_URL}${roboBetaPath}/${encodeURIComponent(a)}" download>
                📥 ${a}
            </a>
        `).join('')}
    `;
}

openRoboBeta?.addEventListener('click', () => {
    roboAtual = 0;
    modalRoboBeta.style.display = "flex";
    setTimeout(() => modalRoboBeta.style.opacity = "1", 10);
    document.body.style.overflow = "hidden";
    renderRoboBeta();
});

// === NOVO: botão "Ver mais" também abre o modal ===
btnRoboVerMais?.addEventListener('click', (e) => {
    e.stopPropagation(); // evita conflito com clique no card
    roboAtual = 0;
    modalRoboBeta.style.display = "flex";
    setTimeout(() => modalRoboBeta.style.opacity = "1", 10);
    document.body.style.overflow = "hidden";
    renderRoboBeta();
});

nextRobo?.addEventListener('click', () => {
    roboAtual = (roboAtual + 1) % imagensRoboBeta.length;
    renderRoboBeta();
});

prevRobo?.addEventListener('click', () => {
    roboAtual = (roboAtual - 1 + imagensRoboBeta.length) % imagensRoboBeta.length;
    renderRoboBeta();
});

document.querySelector('.closeModalRobo')
    ?.addEventListener('click', () => closeModalFunc(modalRoboBeta));

    /* ----------------------------------------------------- */
    /* 7. FECHAMENTO GLOBAL                                 */
    /* ----------------------------------------------------- */
    window.addEventListener('click', (event) => {
        if (event.target === modalCurriculo) closeModalFunc(modalCurriculo);
        if (event.target === modalFortinet) closeModalFunc(modalFortinet);
        if (event.target === modalRoboBeta) closeModalFunc(modalRoboBeta);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            if (modalCurriculo?.style.display === "flex") closeModalFunc(modalCurriculo);
            if (modalFortinet?.style.display === "flex") closeModalFunc(modalFortinet);
            if (modalRoboBeta?.style.display === "flex") closeModalFunc(modalRoboBeta);
        }
    });

});
