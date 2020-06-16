const toggleButton = document.querySelector('.sidebar-toggle');
const closeButton = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

toggleButton.addEventListener('click', () => {
  // if (sidebar.classList.contains('show-sidebar')) {
  //   sidebar.classList.remove('show-sidebar');
  // } else {
  //   sidebar.classList.add('show-sidebar');
  // }

  sidebar.classList.toggle('show-sidebar');
});

closeButton.addEventListener('click', () => {
  sidebar.classList.remove('show-sidebar');
});
