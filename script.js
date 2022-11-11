//document.getElementById("mainContainer").classList changed elements classes

//mostly used to show or hide groups of elements
function changeDisplay(group, displayType){
    var elements = document.getElementsByClassName(group);
    for(x = 0; x < elements.length; x++){
        elements[x].style.display = displayType;
    }
}

//changes text of elements
function changeText(element, text){
    document.getElementById(element).innerHTML(text)
}

function questionGen(questionNum, topic, question){
    questionGroup = "questionScreen";
    changeText("questionText", questionNum = ". " + topic);
    changeText("questionText", question);
}

document.getElementById("startButton").addEventListener("click", function(){ changeDisplay("introScreen", "none"); });

//changeDisplay("introScreen", "none");