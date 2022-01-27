// # generate a word at random and store it in a variable
// # display the length of the word to the user
// # correct_guesses is less than the length of the word
// # prompt the user to guess a letter
// # if the guess is correct increment correct_guesses by 1
// # if the guess is incorrect increment incorrect_guesses by 1 
// # and draw the next part of the hangman
// # if the incorrect_guesses is greater than 8, tell the user 
// # they lost and exit the program
// # if correct_guesses is equal to the length of the word, tell the user they won

var _letters = 'abcdefghijklmnopqrstuvwxyz'
var _wordList = ['sword', 'spear', 'axe', 'tomahawk']

var game = {
	word: null,
	chance: 8,
	correct_guesses: 0,
	wrong_guesses: 0,
	start: function(){
		this.renderLetters();
		this.word = convert(randomWord(_wordList))
		this.render();
	},
	checkLetter: function(l){
		console.log('checking letter: ' + l)
		var c = 0
		for (var i = 0; i < this.word.length; i++) {
			if(l == this.word[i].letter){
				c++
				this.word[i].guessed = true
			}
		}

		if(c>0){
			this.correct_guesses += c;
		}else{
			this.wrong_guesses++
			this.chance--
		}

		this.checkGame();
	},
	checkGame: function(){
		this.render();
		console.log(this.correct_guesses, this.word.length)
		if(this.correct_guesses == this.word.length){
			setTimeout(function(){
				alert('win')
			}, 100)
		}
		if(this.chance == 0){
			setTimeout(function(){
				alert('lose')
			}, 100)
		}
	},
	renderLetters: function(){
		var self = this;
		for (var i = 0; i < _letters.length; i++) {
			var span = document.createElement('span')
			span.innerHTML = '<button>'+_letters[i]+'</button>'
			span.style.margin = '0 2px'
			span.onclick = function(e){
				e.target.setAttribute('disabled', true)
				self.checkLetter(e.target.innerHTML)
			}
			document.getElementById('letters').appendChild(span)
		}
	},
	render: function(){
		renderWord(this.word)
		document.getElementById('chance').innerHTML = this.chance
	}
}

window.onload = function(){
	game.start();
}

// ===

function convert(word){
	var arrOfObj = []
	for (var i = 0; i < word.length; i++) {
		arrOfObj.push({
			letter: word[i],
			guessed: false
		})
	}
	return arrOfObj
}

function random(a, b){
	return Math.floor(Math.random() * (b - a + 1)) + a
}

function randomWord(arr){
	return arr[random(0, arr.length-1)]
}

function renderWord(word){
	document.getElementById('word').innerHTML = ''
	for (var i = 0; i < word.length; i++) {
		if(word[i].guessed){
			document.getElementById('word').innerHTML += word[i].letter
		}else{
			document.getElementById('word').innerHTML += ' _ '
		}
	}
}
