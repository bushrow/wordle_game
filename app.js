let rows = { row1: "qwertyuiop", row2: "asdfghjkl", row3: "zxcvbnm" };

let brd = document.getElementById("keyboard");
for (let row in rows) {
  let letters = rows[row];
  let keyRow = document.createElement("div");
  keyRow.classList.add("keyboard-row");
  for (let i = 0; i < letters.length; i++) {
    let ele = document.createElement("div");
    ele.id = letters[i];
    ele.classList.add("key");
    ele.textContent = letters[i].toUpperCase();
    keyRow.appendChild(ele);
  }
  brd.appendChild(keyRow);
}




function getWord() {
  let theUrl = "https://6qst7bhcdh.execute-api.us-east-1.amazonaws.com/default/select_wordle";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

const myWord = getWord()

function nextBox(e, currentBox) {
  let nextBox = currentBox.nextElementSibling;
  let prevBox = currentBox.previousElementSibling;

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
  let entry = "";
  for (let i = 0; i < currentRow.children.length; i++) {
    let letter = currentRow.children[i].value
    entry += letter;
    let letterKey = document.getElementById(letter);
    if (letter === myWord.charAt(i)) {
      currentRow.children[i].classList.add("correct");
      letterKey.classList.add("correct");
    } else if (myWord.includes(letter)) {
      currentRow.children[i].classList.add("included");
      letterKey.classList.add("included");
    } else {
      currentRow.children[i].classList.add("incorrect");
      letterKey.classList.add("incorrect");
    }
  }

  if (entry === myWord) {
    alert("CORRECT!")
    return;
  } else {
    let nextRow = currentRow.nextElementSibling;
    nextRow.firstElementChild.focus();
    nextRow.firstElementChild.select();
  }
}