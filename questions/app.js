//using selectors inside the element
const questions = Array.from(document.querySelectorAll('.question'));

questions.forEach((question) => {
  const btn = question.querySelector('.question-btn');
  btn.addEventListener('click', () => {
    questions.forEach((item) => {
      if (item !== question) {
        item.classList.remove('show-text');
      }
    });
    question.classList.toggle('show-text');
  });
});

// traversing the dom
// const buttons = document.querySelectorAll('.question-btn');

// buttons.forEach((button) =>
//   button.addEventListener('click', (e) => {
//     const question = e.currentTarget.parentElement.parentElement;
//     question.classList.toggle('show-text');
//   })
// );
