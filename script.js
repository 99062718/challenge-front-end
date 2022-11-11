//document.getElementById("mainContainer").classList changed elements classes

//mostly used to show or hide groups of elements
function changeDisplay(group, displayType){
    var elements = document.getElementsByClassName(group);
    for(x = 0; x < elements.length; x++){
        elements[x].style.display = displayType;
    }
}

//changeDisplay("introScreen", "none");