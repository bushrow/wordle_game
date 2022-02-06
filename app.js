function getWord() {
  var theUrl = "https://6qst7bhcdh.execute-api.us-east-1.amazonaws.com/default/select_wordle";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

const myWord = getWord()

function nextBox(e, currentBox) {
  var nextBox = currentBox.nextElementSibling;
  var prevBox = currentBox.previousElementSibling;

  if (nextBox == null && e.keyCode === 13) {
    var currentRow = currentBox.parentElement;
    checkInput(currentRow);
  } else if (currentBox.value.length >= currentBox.maxLength) {
    nextBox.focus();
    nextBox.select();
  } else if (currentBox.value.length === 0) {
    if (prevBox == null) {
      return;
    } else {
      prevBox.focus();
      prevBox.select();
    }
  }

}

function checkInput(currentRow) {
  var entry = "";
  for (let i = 0; i < currentRow.children.length; i++) {
    var letter = currentRow.children[i].value
    entry += letter;
    if (letter === myWord.charAt(i)) {
      currentRow.children[i].classList.add("correct")
    } else if (myWord.includes(letter)) {
      currentRow.children[i].classList.add("included")
    } else {
      currentRow.children[i].classList.add("incorrect")
    }
  }

  if (entry === myWord) {
    alert("CORRECT!")
    return;
  } else {
    var nextRow = currentRow.nextElementSibling;
    nextRow.firstElementChild.focus();
    nextRow.firstElementChild.select();
  }
}