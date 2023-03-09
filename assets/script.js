var containerQuestionEl = document.getElementById("question-container");
      var containerStartEl = document.getElementById("starter-container");
      var containerEndEl = document.getElementById("end-container")
      var containerScoreEl = document.getElementById("score-banner")
      var formInitials = document.getElementById("initials-form")
      var containerHighScoresEl = document.getElementById("high-score-container")
      var viewHighScoreEl = document.getElementById("view-high-scores")
      var listHighScoreEl = document.getElementById("high-score-list")
      var correctEl = document.getElementById("correct")
      var wrongEl = document.getElementById("wrong")
      var btnStartEl = document.querySelector("#start-game");
      var btnGoBackEl = document.querySelector("#go-back")
      var btnClearScoresEl = document.querySelector("#clear-high-scores")
      var questionEl = document.getElementById("question")
      var answerBtnsEl = document.getElementById("answer-buttons")
      var timerEl = document.querySelector("#timer");
      var score = 0;
      var timeleft;
      var gameover
      timerEl.innerText = 0;

      var highScores = [];

      var arrayShuffledQuestions
      var QuestionIndex = 0

      var questions = [
        { question: 'Inside which HTML element do we put the JavaScript?',
            choices: [{choice: '1. <scripts>'}, {choice: '2. <js>'}, {choice: '3. <javascript>'}, {choice: '4. <scripting>'}],
            answer: '1. <scripts>',
          },
        { question: 'What does CSS stand for?',
        choices: [{choice: '1. Cascading Style Sheets'}, {choice: '2. Current Style Stuff'}, {choice: '3. Creative Sheet Styling'}, {choice: '4. Crumbly Square Saladas'}],
        answer: '1. Cascading Style Sheets',
        },
        { question: 'What does JS stand for?',
        choices: [{choice: '1. JavaScript'}, {choice: '2. JollySailor'}, {choice: '3. JavaSheets'}, {choice: '4. JustStuf'}],
        answer: '1. JavaScript',
        },
        { question:
            'What does HTML stand for?',
          choices: [{choice: '1. HyperText Markup Language'}, {choice: '2. HyperToothy Mouse Laughing'}, {choice: '3. How To Make Lasagne'}, {choice: '4. Hello There, More Lunch?'}],
          answer: '1. HyperText Markup Language',
        },
      ];
      
    var renderStartPage = function () {
        containerHighScoresEl.classList.add("hide")
        containerHighScoresEl.classList.remove("show")
        containerStartEl.classList.remove("hide")
        containerStartEl.classList.add("show")
        containerScoreEl.removeChild(containerScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }
    var setTime = function () {
        timeleft = 30;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
        containerStartEl.classList.add('hide');
        containerStartEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }

    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }

    var resetAnswers = function() {
        while (answerBtnsEl.firstChild) {
            answerBtnsEl.removeChild(answerBtnsEl.firstChild)
        };
    };

    var displayQuestion = function(index) {
        questionEl.innerText = index.question
        for (var i = 0; i < index.choices.length; i++) {
            var answerBtn = document.createElement('button')
            answerBtn.innerText = index.choices[i].choice
            answerBtn.classList.add('btn')
            answerBtn.classList.add('answerbtn')
            answerBtn.addEventListener("click", answerCheck)
            answerBtnsEl.appendChild(answerBtn)
            }
        };
    
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  
    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }
  
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].answer === selectedanswer.innerText){
                answerCorrect()
                score = score + 5
            }

            else {
              answerWrong()
          };

          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

    var showScore = function () {
        containerQuestionEl.classList.add("hide");
        containerEndEl.classList.remove("hide");
        containerEndEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        containerScoreEl.appendChild(scoreDisplay);
    }       
    
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      formInitials.reset();

      var highScore = {
      initials: initials,
      score: score
      } 

      highScores.push(highScore);
      highScores.sort((a, b) => {return b.score-a.score});

    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }

    for (var i = 0; i < highScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = highScores[i].initials + " - " + highScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }

    var saveHighScore = function () {
        localStorage.setItem("highScores", JSON.stringify(highScores))
            
    }

    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            highScores.push(LoadedHighScores[i]);
            
        }
    }  

    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show");
            containerEndEl.classList.add("hide");
            }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show");
            containerStartEl.classList.add("hide");
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
            }
        
    }

    var clearScores = function () {
        highScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      btnStartEl.addEventListener("click", startGame)

      formInitials.addEventListener("submit", createHighScore)

      viewHighScoreEl.addEventListener("click", displayHighScores)

      btnGoBackEl.addEventListener("click", renderStartPage)

      btnClearScoresEl.addEventListener("click", clearScores)