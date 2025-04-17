document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('darkToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
      });
    }
  });
  