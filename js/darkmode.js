document.addEventListener('DOMContentLoaded', function () {
  const darkModeBtn = document.getElementById('toggle-dark');

  darkModeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
  });

  // Opcional: Salvar preferência no localStorage
  if (localStorage.getItem('dark-mode') === 'on') {
    document.body.classList.add('dark-mode');
  }
  darkModeBtn.addEventListener('click', function () {
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'on');
    } else {
      localStorage.setItem('dark-mode', 'off');
    }
  });
});