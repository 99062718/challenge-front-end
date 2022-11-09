//document.getElementById("mainContainer").classList changed elements classes

function changeVisibility(group, visibleOrHidden){
    var elements = document.getElementsByClassName(group);
    for(x = 0; x < elements.length; x++){
        elements[x].style.visibility = visibleOrHidden;
    }
}