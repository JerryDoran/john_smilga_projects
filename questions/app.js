//using selectors inside the element

// traversing the dom
const buttons = document.querySelectorAll('.question-btn');

buttons.forEach((button) =>
  button.addEventListener('click', (e) => {
    const question = e.currentTarget.parentElement.parentElement;
    question.classList.toggle('show-text');
  })
);
