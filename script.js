(function() {
  var questions = [{
    question: "What is the keyword used to create a function in JavaScript?",
    choices: ["class", "function", "var", "method"],
    correctAnswer: 1
  }, {
    question: "How do you find the length of a string in JavaScript?",
    choices: ["string.size()", "string.length()", "string.count()", "string.length"],
    correctAnswer: 3
  }, {
    question: "What is the syntax for a for loop in JavaScript?",
    choices: ["for (i = 0; i < 10; i++)", "while i < 10", "repeat i < 10", "do i < 10"],
    correctAnswer: 0
  }, {
    question: "How do you create an object in JavaScript?",
    choices: ["class MyObject {}" , "object MyObject {}" , "var obj = new Object();" , "var obj = Object[];"],
    correctAnswer: 2
  }, {
    question: "How not to check if a variable is an array in JavaScript?",
    choices: ["if (Array.isArray(myVar))" , "if (myVar instanceof Array)" , 'if (typeof myVar === "array")' , "if (myVar.constructor === Array)" ],
    correctAnswer: 2
  }];
  
  var questionCounter = 0; 
  var selections = []; 
  var quiz = $('#quiz'); 
  
  displayNext();
  
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
   
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  

  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
 
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
       
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions right out of ' +
                 questions.length + ' questions!!!');
    return score;
  }
})();