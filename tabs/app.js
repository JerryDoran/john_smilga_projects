const btns = Array.from(document.querySelectorAll('.tab-btn'));
const about = document.querySelector('.about');
const articles = Array.from(document.querySelectorAll('.content'));

about.addEventListener('click', (e) => {
  const id = e.target.dataset.id;

  // check to see if an id exists and it is not undefined
  if (id) {
    btns.forEach((btn) => {
      // remove active from other buttons
      btn.classList.remove('active');
      // add active to the button that was clicked
      e.target.classList.add('active');
    });
    // hide all articles
    articles.forEach((article) => {
      article.classList.remove('active');
    });
    const element = document.getElementById(id);
    element.classList.add('active');
  }
});
