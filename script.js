'use strict';

const btnStart = document.querySelector('.startQuizBtn');
const greetBox = document.querySelector('.greetingBox');
const quizBox = document.querySelector('.quizBox');
const questionEl = document.querySelector('.question');
const answersBtn = document.querySelectorAll('.answer');
const endQuiz = document.querySelector(".endQuiz");
const message = document.querySelector(".message");

btnStart.addEventListener('click', () => {
	greetBox.classList.add('hidden');
	quizBox.classList.remove('hidden');
});

class App {
	#playerPoints = 0;
	#round = 0;
	#questions = [
		{
			text: 'Jakiego języka używa się do stylowania stron WWW?',
			answers: ['HTML', 'CSS', 'JavaScript', 'Python'],
			correct: 'CSS',
		},
		{
			text: 'Który z poniższych jest językiem programowania?',
			answers: ['CSS', 'HTML', 'JavaScript', 'SQL'],
			correct: 'JavaScript',
		},
		{
			text: 'Które z poniższych jest typem danych w JavaScript?',
			answers: ['String', 'Div', 'Selector', 'Class'],
			correct: 'String',
		},
		{
			text: 'Jakie narzędzie służy do kontroli wersji?',
			answers: ['Git', 'Node.js', 'VS Code', 'React'],
			correct: 'Git',
		},
		{
			text: 'Co oznacza skrót API?',
			answers: [
				'Application Programming Interface',
				'Active Page Index',
				'Advanced Programming Input',
				'Application Page Integration',
			],
			correct: 'Application Programming Interface',
		},
		{
			text: 'Która metoda dodaje element do końca tablicy w JavaScript?',
			answers: ['push()', 'pop()', 'shift()', 'unshift()'],
			correct: 'push()',
		},
		{
			text: 'Który z poniższych jest frameworkiem JavaScript?',
			answers: ['React', 'Django', 'Laravel', 'Flask'],
			correct: 'React',
		},
		{
			text: 'Która właściwość CSS zmienia kolor tła elementu?',
			answers: ['background-color', 'color', 'font-size', 'border'],
			correct: 'background-color',
		},
		{
			text: 'Jaka jest poprawna składnia komentarza w JavaScript?',
			answers: [
				'// komentarz',
				'/* komentarz */',
				'obydwa powyżej',
				'# komentarz',
			],
			correct: 'obydwa powyżej',
		},
		{
			text: 'Która z poniższych metod pobiera element po jego ID w JavaScript?',
			answers: [
				'getElementById()',
				'querySelector()',
				'getElementsByClassName()',
				'getElementByTagName()',
			],
			correct: 'getElementById()',
		},
	];
	#quizStarted = false;

	constructor() {
		btnStart.addEventListener('click', this._startQuiz.bind(this));
		answersBtn.forEach((btn) =>
			btn.addEventListener('click', this._check.bind(this))
		);
	}

	_startQuiz() {
		greetBox.classList.add('hidden');
		quizBox.classList.remove('hidden');
		this.#quizStarted = true;
		this._showQuestion();
	}

	_showQuestion() {
		if (!this.#quizStarted) return;
		const question = this.#questions[this.#round];

		questionEl.textContent = question.text;

		answersBtn.forEach((btn, i) => (btn.textContent = question.answers[i]));
	}

	_check(e) {
		const answer = e.target.textContent;

		if (this.#round === (this.#questions.length - 1)) {
			this._endQuiz();
			return;
		}

        if (answer === this.#questions[this.#round]["correct"]) {
			this.#playerPoints++;
            this.#round++;
			this._showQuestion();

        } else {
			this.#round++;
			this._showQuestion();
		}
	}

	_endQuiz() {
		quizBox.classList.add("hidden");
		endQuiz.classList.remove("hidden");

		message.textContent = `Brawo ukończyłeś quiz poprawnie odpowiedziałeś na ${this.#playerPoints} pytań a źle na ${(this.#round + 1) - this.#playerPoints}`;
	}
}

const app = new App();
