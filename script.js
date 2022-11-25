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
    "Lokaal in de Kamer": 0,
    "OndernemersPartij": 0,
    "VNL": 0,
    "Nieuwe Wegen": 0,
    "De Burger Beweging": 0,
    "Piratenpartij": 0,
    "Artikel 1": 0,
    "Libertarische Partij": 0,
    "50Plus": 0,
    "Vrijzinnige Partij": 0,
    "Niet Stemmers": 0
};
var questionScore = {};
var buttons = document.getElementsByClassName("stanceButtons");

parties.splice(parties.length - 2, 1);

//mostly used to show or hide groups of elements
function changeDisplayClass(group, displayType){
    var elements = document.getElementsByClassName(group);
    for(let x = 0; x < elements.length; x++){
        elements[x].style.display = displayType;
    }
}

//targets specific elements to hide or display
function changeDisplayId(id, displayType){
    document.getElementById(id).style.display = displayType;
}

//changes text of elements
function changeText(element, text){
    document.getElementById(element).innerHTML = text;
}

//generates new question
function questionGen(topic, question, stances){
    changeText("topicText", currentQuestion + 1 + ". " + topic);
    changeText("questionText", question);

    for(let x = 0; x < stances.length; x++){
        document.getElementById(`${stances[x]["name"]} stance`).innerHTML = stances[x]["position"];
        document.getElementById(`${stances[x]["name"]} opinion`).innerHTML = stances[x]["opinion"];
    }

    if(questionExistCheck()){
        let colors = [];
        for(let x = 0; x < buttons.length; x++){
            colors.push(buttons[x].id == questionScore[subjects[currentQuestion]["title"]]["stance"] ? "blue" : "black");
        }
        changeButtonColors(colors);
    } else {
        changeButtonColors(["black", "black", "black"]);
    }
}

function changeButtonColors(colors){
    for(let x = 0; x < buttons.length; x++){
        buttons[x].style.backgroundColor = colors[x];
    }
}

//checks if question is already in questionScore or not
function questionExistCheck(){
    return subjects[currentQuestion]["title"] in questionScore;
}

//handles user answers and goes to next question
function answeredQuestion(answer){
    if(!questionExistCheck()){
        questionScore[subjects[currentQuestion]["title"]] = {"stance": answer, "multiplier": 1};
    } else {
        questionScore[subjects[currentQuestion]["title"]]["stance"] = answer;
    }

    nextQuestion();
}

function nextQuestion(){
    currentQuestion++;

    if(currentQuestion == subjects.length){
        changeDisplayClass("questionScreen", "none");
        changeDisplayClass("importanceScreen", "block");
        for(let x = 0; x < subjects.length; x++){
            if(subjects[x]["title"] in questionScore){
                changeDisplayId(subjects[x]["title"], "block");
            } else {
                changeDisplayId(subjects[x]["title"], "none");
            }
        }
    } else {
        questionGen(subjects[currentQuestion]["title"], subjects[currentQuestion]["statement"], subjects[currentQuestion]["parties"]);
    }
}


// calculates score for each party
function finalScoreCalc(){
    for(let x = 0; x < subjects.length; x++){
        if(subjects[x]["title"] in questionScore){
            for(let y = 0; y < subjects[x]["parties"].length; y++){
                partijScore[subjects[x]["parties"][y]["name"]] += questionScore[subjects[x]["title"]]["stance"] == subjects[x]["parties"][y]["position"] ? 1 * questionScore[subjects[x]["title"]]["multiplier"] : 0;
            }
        }
    }
}

//checks which page to go to after pressing backButton
function goLastPage(){
    switch(currentQuestion){
        case 0:
            changeDisplayClass("introScreen", "block");
            changeDisplayClass("questionScreen", "none");
            changeDisplayId("backButton", "none");
            return;
        case 30:
            changeDisplayClass("questionScreen", "block");
            changeDisplayClass("importanceScreen", "none");
            break;
        default:
            break;
    }

    currentQuestion--;
    questionGen(subjects[currentQuestion]["title"], subjects[currentQuestion]["statement"], subjects[currentQuestion]["parties"]);
}

//importance screen generation
for(let x = 0; x < subjects.length; x++){
    var div = document.createElement("div");
    div.id = subjects[x]["title"];

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = subjects[x]["title"] + "Input";

    var label = document.createElement("label");
    label.htmlFor = subjects[x]["title"] + "Input";
    label.appendChild(document.createTextNode(subjects[x]["title"]));

    document.getElementById("questionDiv").appendChild(div);
    div.appendChild(checkBox);
    div.appendChild(label);
}

//generates elements for questionStances div
for(key in partijScore){
    var toCreate = ["div", "p", "p", "div", "i", "p"];
    var elems = [];
    for(let x = 0; x < toCreate.length; x++){
        elems.push(document.createElement(toCreate[x]));
    }
    
    elems[0].id = key;
    elems[1].innerHTML = key;
    elems[2].id = `${key} stance`;
    elems[4].classList = "material-icons";
    elems[4].innerHTML = "chevron_right";
    elems[5].id = `${key} opinion`;
    elems[5].style.display = "none";

    document.getElementById("questionStances").appendChild(elems[0]);
    elems[0].appendChild(elems[1]);
    elems[0].appendChild(elems[2]);
    elems[0].appendChild(elems[3]);
    elems[3].appendChild(elems[4]);
    elems[0].appendChild(elems[5]);

    elems[3].addEventListener("click", function(){
        let parent = this.parentElement.id;
        let currentDisplay = document.getElementById(`${parent} opinion`).style.display != "block" ? "block" : "none"
        changeDisplayId(`${parent} opinion`, currentDisplay);
    })
}


//button bindings
document.getElementById("startButton").addEventListener(
    "click", function(){
        changeDisplayClass("introScreen", "none");
        changeDisplayClass("questionScreen", "block");
        changeDisplayId("backButton", "block");
        questionGen(subjects[currentQuestion]["title"], subjects[currentQuestion]["statement"], subjects[currentQuestion]["parties"]);
    }
);

for(let x = 0; x < buttons.length; x++){
    buttons[x].addEventListener("click", function(){answeredQuestion(this.id);});
}
document.getElementById("slaOver").addEventListener("click", function(){nextQuestion();})

document.getElementById("backButton").addEventListener("click", function(){goLastPage();})

var currentDisplay = "none";
document.getElementById("stanceExpandButton").addEventListener("click", function(){
    currentDisplay = currentDisplay == "none" ? "block" : "none"
    changeDisplayId("questionStances", currentDisplay);
})

document.getElementById("goToScoreButton").addEventListener("click", function(){
    changeDisplayClass("importanceScreen", "none");
    changeDisplayClass("scoreScreen", "block");
    changeDisplayId("backButton", "none");
    finalScoreCalc();
})