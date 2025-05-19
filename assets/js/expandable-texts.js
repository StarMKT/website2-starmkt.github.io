// SECTION 9 – animação de acordeão
document.querySelectorAll(".office-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
  
      // se quiser só um aberto por vez, feche todos antes
      document.querySelectorAll(".office-toggle").forEach(b => {
        b.setAttribute("aria-expanded", "false");
        b.nextElementSibling.style.maxHeight = 0;
      });
  
      // abrir ou fechar o clicado
      btn.setAttribute("aria-expanded", !expanded);
      const content = btn.nextElementSibling;
      if (!expanded) {
        // mede a altura total do conteúdo para abrir
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = 0;
      }
    });
  });
  