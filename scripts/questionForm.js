const form = document.querySelector("form");
const questionList = document.querySelector('[data-js="question-list"]');

const questionInput = document.querySelector('[data-js="question-input"]');
const answerInput = document.querySelector('[data-js="answer-input"]');

const questionCount = document.querySelector('[data-js="question-count"]');
const answerCount = document.querySelector('[data-js="answer-count"]');

questionInput.addEventListener("input", (event) => {
  textareaCountdown(questionCount, event);
});

answerInput.addEventListener("input", (event) => {
  textareaCountdown(answerCount, event);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData);
  //createQuestionItem(formValues);
  createQuestionItemEasily(formValues);

  // Cleanup after submit.
  questionCount.textContent = "150 characters left.";
  answerCount.textContent = "150 characters left.";
  event.target.reset();
  event.target.elements.question.focus();
});

// A function that create an question item filled with data given inside the event listener.
function createQuestionItem(data) {
  const questionItem = document.createElement("li");
  const question = document.createElement("p");
  const answer = document.createElement("p");
  const tag = document.createElement("span");

  question.textContent = data.question;
  answer.textContent = data.answer;
  tag.textContent = data.tag;

  questionItem.append(question, answer, tag);

  questionList.appendChild(questionItem);
}

function createQuestionItemEasily(data) {
  const questionItem = document.createElement("div");
  questionItem.innerHTML = `<li class="card-list__item">
  <article class="card">
    <h2 class="card__question">
    ${data.question}
    </h2>
    <button class="card__button-answer" type="button">
      Show answer
    </button>
    <p class="card__answer">${data.answer}</p>
    <ul class="card__tag-list">
    ${data.tag ? `<li class="card__tag-list-item">${data.tag}</li>` : ""}
      
    </ul>
    <div class="card__button-bookmark">
      <button
        class="bookmark"
        aria-label="bookmark"
        type="button"
        data-js="bookmark-button"
      >
        <svg
          class="bookmark__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewbox="0 0 24 24"
        >
          <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      </button>
    </div>
  </article>
</li>;`;
  questionList.appendChild(questionItem);
}

// A function that shows how many characters are left in the textarea.
function textareaCountdown(target, event) {
  const maxLength = 150;
  const currentLength = event.target.value.length;
  console.log(currentLength);

  charactersLeft = maxLength - currentLength;

  target.textContent = `${charactersLeft} character${
    charactersLeft === 1 ? "" : "s"
  } left.`;
}
