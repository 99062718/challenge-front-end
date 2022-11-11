//document.getElementById("mainContainer").classList changed elements classes

var currentQuestion = 0
var partijScore = {
    "VVD": 0,
    "CDA": 0,
    "PVV": 0,
    "D66": 0,
    "GroenLinks": 0,
    "SP": 0,
    "PvdA": 0,
    "ChristenUnie": 0,
    "Partij voor de Dieren": 0,
    "SGP": 0,
    "DENK": 0,
    "Forum voor Democratie": 0,
    "Lokaal in de kamer": 0,
    "OndernemersPartij": 0,
    "VNL": 0,
    "Nieuwe Wegen": 0,
    "De Burger Beweging": 0,
    "Piratenpatij": 0,
    "Artikel 1": 0,
    "Libertarische Partij": 0,
    "50Plus": 0,
    "Vrijzinnige Partij": 0,
    "Niet Stemmers": 0
};
var questionScore = {};

parties.splice(parties.length - 2, 1);

//mostly used to show or hide groups of elements
function changeDisplay(group, displayType){
    var elements = document.getElementsByClassName(group);
    for(x = 0; x < elements.length; x++){
        elements[x].style.display = displayType;
    }
}

//changes text of elements
function changeText(element, text){
    document.getElementById(element).innerHTML = text;
}

//generates new question
function questionGen(topic, question){
    changeText("topicText", currentQuestion + 1 + ". " + topic);
    changeText("questionText", question);
}

//checks if question is already in questionScore or not
function questionExistCheck(){
    return currentQuestion in questionScore;
}

//handles user answers and goes to next question
function answeredQuestion(answer){
    if(!questionExistCheck()){
        questionScore[currentQuestion] = {"subject": subjects[currentQuestion]["title"], "stance": answer, "multiplier": 1};
    } else {
        questionScore[currentQuestion]["stance"] = answer;
    }

    currentQuestion++;

    if(currentQuestion == subjects.length){
        finalScoreCalc();
    } else {
        questionGen(subjects[currentQuestion]["title"], subjects[currentQuestion]["statement"]);
    }
}

function finalScoreCalc(){
    for(x = 0; x < subjects[currentQuestion]["parties"].length; x++){
        if(subjects[currentQuestion]["parties"][x]["position"] == answer){
            partijScore[subjects[currentQuestion]["parties"][x]["name"]]++;
        }
    }
}

document.getElementById("startButton").addEventListener("click", function(){changeDisplay("introScreen", "none");});

changeDisplay("introScreen", "none");
questionGen(subjects[currentQuestion]["title"], subjects[currentQuestion]["statement"]);