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

parties.splice(parties.length - 2, 1);

//mostly used to show or hide groups of elements
function changeDisplayClass(group, displayType){
    var elements = document.getElementsByClassName(group);
    for(x = 0; x < elements.length; x++){
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

    for(x = 0; x < stances.length; x++){
        document.getElementById(`${stances[x]["name"]} stance`).innerHTML = stances[x]["position"];
        document.getElementById(`${stances[x]["name"]} opinion`).innerHTML = stances[x]["opinion"];
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

    currentQuestion++;

    if(currentQuestion == subjects.length){
        changeDisplayClass("questionScreen", "none");
        changeDisplayClass("importanceScreen", "block");
        for(x = 0; x < subjects.length; x++){
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

function finalScoreCalc(){
    for(x = 0; x < subjects[currentQuestion]["parties"].length; x++){
        if(subjects[currentQuestion]["parties"][x]["position"] == answer){
            partijScore[subjects[currentQuestion]["parties"][x]["name"]]++;
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
for(x = 0; x < subjects.length; x++){
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
    var div = document.createElement("div");
    div.id = key;

    var p1 = document.createElement("p");
    p1.innerHTML = key;

    var p2 = document.createElement("p");
    p2.id = `${key} stance`;

    var div2 = document.createElement("div");
    var i = document.createElement("i");
    i.classList = "material-icons";
    i.innerHTML = "chevron_right";

    var p3 = document.createElement("p");
    p3.id = `${key} opinion`;
    p3.style.display = "none";

    document.getElementById("questionStances").appendChild(div);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(div2);
    div2.appendChild(i);
    div.appendChild(p3);

    div2.addEventListener("click", function(){
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

var stances = ["pro", "geen", "contra"];
var buttons = document.getElementsByClassName("stanceButtons");
for(x = 0; x < stances.length; x++){
    buttons[x].addEventListener("click", function(){answeredQuestion(stances[x]);});
}
document.getElementById("slaOver").addEventListener("click", function(){
    currentQuestion++;
    questionGen(subjects[currentQuestion]["title"], subjects[currentQuestion]["statement"], subjects[currentQuestion]["parties"]);
})

document.getElementById("backButton").addEventListener("click", function(){goLastPage();})

var currentDisplay = "none";
document.getElementById("stanceExpandButton").addEventListener("click", function(){
    currentDisplay = currentDisplay == "none" ? "block" : "none"
    changeDisplayId("questionStances", currentDisplay);
})