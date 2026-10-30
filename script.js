'use strict';

const btnStart      = document.querySelector('.startQuizBtn');
const greetBox      = document.querySelector('.greetingBox');
const quizBox       = document.querySelector('.quizBox');
const questionEl    = document.querySelector('.question');
const answersBtn    = document.querySelectorAll('.answer');
const endQuiz       = document.querySelector('.endQuiz');
const message       = document.querySelector('.message');

const currentQEl    = document.querySelector('.currentQ');
const totalQEl      = document.querySelector('.totalQ');
const scoreDisplay  = document.querySelector('.scoreDisplay');
const progressFill  = document.querySelector('.progressBar__fill');
const statCorrect   = document.querySelector('.stat-correct');
const statWrong     = document.querySelector('.stat-wrong');
const restartBtn    = document.querySelector('.restartBtn');

class App {
	#playerPoints = 0;
	#round        = 0;
	#quizStarted  = false;

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

	constructor() {
		totalQEl.textContent = this.#questions.length;
		btnStart.addEventListener('click', this._startQuiz.bind(this));
		answersBtn.forEach(btn =>
			btn.addEventListener('click', this._check.bind(this))
		);
		restartBtn.addEventListener('click', this._restart.bind(this));
	}

	_startQuiz() {
		greetBox.classList.add('hidden');
		quizBox.classList.remove('hidden');
		this.#quizStarted = true;
		this._showQuestion();
	}

	_showQuestion() {
		if (!this.#quizStarted) return;

		answersBtn.forEach(btn => {
			btn.classList.remove('correct', 'wrong');
			btn.disabled = false;
		});

		const question = this.#questions[this.#round];
		questionEl.textContent = question.text;
		answersBtn.forEach((btn, i) => (btn.textContent = question.answers[i]));

		currentQEl.textContent = this.#round + 1;
		scoreDisplay.textContent = this.#playerPoints;
		const pct = (this.#round / this.#questions.length) * 100;
		progressFill.style.width = `${pct}%`;
	}

	_check(e) {
		if (!this.#quizStarted) return;

		const btn    = e.currentTarget;
		const answer = btn.textContent;
		const isCorrect = answer === this.#questions[this.#round].correct;

		answersBtn.forEach(b => (b.disabled = true));
		btn.classList.add(isCorrect ? 'correct' : 'wrong');

		if (!isCorrect) {
			answersBtn.forEach(b => {
				if (b.textContent === this.#questions[this.#round].correct) {
					b.classList.add('correct');
				}
			});
		}

		if (isCorrect) this.#playerPoints++;

		const isLast = this.#round === this.#questions.length - 1;

		setTimeout(() => {
			if (isLast) {
				this._endQuiz();
			} else {
				this.#round++;
				this._showQuestion();
			}
		}, 800);
	}

	_endQuiz() {
		this.#quizStarted = false;
		quizBox.classList.add('hidden');
		endQuiz.classList.remove('hidden');

		const wrong = this.#questions.length - this.#playerPoints;
		statCorrect.textContent = this.#playerPoints;
		statWrong.textContent   = wrong;

		const pct = Math.round((this.#playerPoints / this.#questions.length) * 100);
		let emoji = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪';
		document.querySelector('.endQuiz__emoji').textContent = emoji;

		message.textContent = `Odpowiedziałeś poprawnie na ${this.#playerPoints} z ${this.#questions.length} pytań (${pct}%).`;

		progressFill.style.width = '100%';
	}

	_restart() {
		this.#playerPoints = 0;
		this.#round        = 0;
		this.#quizStarted  = false;

		endQuiz.classList.add('hidden');
		greetBox.classList.remove('hidden');

		progressFill.style.width = '0%';
		currentQEl.textContent   = 1;
		scoreDisplay.textContent = 0;
	}
}

const app = new App();
