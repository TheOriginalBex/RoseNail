document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // 1. CARROSSEL DO "SOBRE NÓS" (FOTO + TEXTO)
    // ========================================
    const slidesFotos = document.querySelectorAll(".portrait-slide");
    const biosTexto = document.querySelectorAll(".sobre-bio");
    const indicadores = document.querySelectorAll(".sobre-indicador");
    const btnPrev = document.getElementById("sobre-prev");
    const btnNext = document.getElementById("sobre-next");

    if (slidesFotos.length > 0 && biosTexto.length > 0) {
        let slideAtual = 0;
        let timerCarrossel = null;

        function trocarSlide(index) {
            // Remove ativação de todas as fotos, textos e bolinhas
            slidesFotos.forEach(foto => foto.classList.remove("ativa"));
            biosTexto.forEach(bio => bio.classList.remove("ativa"));
            indicadores.forEach(ind => ind.classList.remove("ativa"));

            // Calcula o índice circular (0, 1, 2)
            slideAtual = (index + slidesFotos.length) % slidesFotos.length;

            // Ativa os elementos correspondentes
            slidesFotos[slideAtual].classList.add("ativa");
            biosTexto[slideAtual].classList.add("ativa");

            if (indicadores[slideAtual]) {
                indicadores[slideAtual].classList.add("ativa");
            }
        }

        function proximo() {
            trocarSlide(slideAtual + 1);
        }

        function anterior() {
            trocarSlide(slideAtual - 1);
        }

        function reiniciarTempo() {
            clearInterval(timerCarrossel);
            timerCarrossel = setInterval(proximo, 15000); // 15 segundos
        }

        if (btnNext) {
            btnNext.addEventListener("click", () => {
                proximo();
                reiniciarTempo();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener("click", () => {
                anterior();
                reiniciarTempo();
            });
        }

        indicadores.forEach((ind, i) => {
            ind.addEventListener("click", () => {
                trocarSlide(i);
                reiniciarTempo();
            });
        });

        // Inicia troca automática a cada 5 segundos
        timerCarrossel = setInterval(proximo, 5000);
    }


    // ========================================
    // 2. CONTROLE DE ABAS (CLIENTES)
    // ========================================
    const abas = document.querySelectorAll(".aba");
    const galerias = document.querySelectorAll(".galeria-servico");

    abas.forEach(aba => {
        aba.addEventListener("click", () => {
            const servico = aba.dataset.servico;

            abas.forEach(outraAba => outraAba.classList.remove("ativa"));
            galerias.forEach(galeria => galeria.classList.remove("ativa"));

            aba.classList.add("ativa");
            const galeriaSelecionada = document.getElementById(servico);
            if (galeriaSelecionada) {
                galeriaSelecionada.classList.add("ativa");
            }
        });
    });


    // ========================================
    // 3. ENVIO WHATSAPP
    // ========================================
    const formContato = document.getElementById("formulario");

    if (formContato) {
        formContato.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !mensagem) {
                alert("Por favor, preencha o seu nome e a mensagem.");
                return;
            }

            const numeroWhatsApp = "8180-7007-4794 "; 
            const textoFormatado = `Olá! Me chamo ${nome}.\n\n${mensagem}`;
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoFormatado)}`;

            window.open(url, "_blank");
        });
    }

});