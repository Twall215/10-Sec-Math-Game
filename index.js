$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highscore = 0;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
    updateHighScore(score);
  };

  var updateHighScore = function (score) {
    if (score > highscore) {
      highscore = score;
      $('#highScore').text(score);
    }
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
          
        }
      }, 1000);  
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    question.generate = function (options){
      if (!options){
        options = ["plus"]
      }
    };
    var QuestionType = options[randomNumberGenerator(options.length)-1];
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    switch (QuestionType) {
      case "plus":
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
        break;
      case "minus":
        question.answer = num1 > num2 ? num1 - num2 : num2 - num1;
        question.question = num1 > num2 ? String(num1) + " - " + String(num2) : String(num2) + " - " + String(num1);
        break;
      case "times":
        question.answer = num1 * num2;
        question.question = String(num1) + " * " + String(num2);
        break;
      case "divide":
        question.answer = num2;
        question.question = String(num1 * num2) + " / " + String(num1);
        break;
    }
    return question;
  };
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();
});