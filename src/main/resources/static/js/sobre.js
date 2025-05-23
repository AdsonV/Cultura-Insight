document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");
  const explorarBtn = document.getElementById("explorarBtn");
  const explorarMenu = document.getElementById("explorarMenu");


  function abrirSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('active');
  }

  function fecharSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
  }

  menuBtn?.addEventListener('click', abrirSidebar);
  closeSidebar?.addEventListener('click', fecharSidebar);
  overlay?.addEventListener('click', fecharSidebar);

  explorarBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = explorarBtn.getAttribute('aria-expanded') === 'true';
    explorarBtn.setAttribute('aria-expanded', !expanded);
    explorarMenu?.classList.toggle('show');

    if (!explorarBtn.contains(e.target) && !explorarMenu.contains(e.target)) {
      explorarMenu?.classList.remove('show');
      explorarBtn?.setAttribute('aria-expanded', 'false');
    }
  });
});