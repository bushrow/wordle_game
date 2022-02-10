const myWord = getWord();
showGuessRows();
showKeyboard();


function showGuessRows() {
  let guessesDiv = document.getElementById("word-guesses");
  for (let i = 0; i < 6; i++) {
    let guessRow = document.createElement('div');
    guessRow.classList.add("guess-row");
    for (let j = 0; j < 5; j++) {
      let box = document.createElement('input');
      box.setAttribute("type", "text");
      box.setAttribute("size", "1");
      box.setAttribute("maxlength", "1");
      box.onkeyup = function (event) { nextBox(event, this) };
      guessRow.appendChild(box);
    }
    guessesDiv.appendChild(guessRow);
  }
}

function showKeyboard() {

  let rows = { row1: "qwertyuiop", row2: "asdfghjkl", row3: "zxcvbnm" };

  let brd = document.getElementById("keyboard");
  for (let row in rows) {
    let letters = rows[row];
    let keyRow = document.createElement("div");
    keyRow.classList.add("keyboard-row");

    if (row === "row3") {
      let ele = document.createElement("div");
      ele.id = "enterKey";
      ele.classList.add("key");
      ele.textContent = "ENTER";
      keyRow.appendChild(ele);
    }

    for (let i = 0; i < letters.length; i++) {
      let ele = document.createElement("div");
      ele.id = letters[i] + "Key";
      ele.classList.add("key");
      ele.textContent = letters[i].toUpperCase();
      keyRow.appendChild(ele);
    }

    if (row === "row3") {
      let ele = document.createElement("div");
      ele.id = "delKey";
      ele.classList.add("key");
      ele.textContent = "<=";
      keyRow.appendChild(ele);
    }

    brd.appendChild(keyRow);
  }
}

function getWord() {
  let theUrl = "https://6qst7bhcdh.execute-api.us-east-1.amazonaws.com/default/select_wordle";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}



function nextBox(e, currentBox) {
  if ((e.keyCode !== 13 && e.keyCode !== 8) && (e.keyCode < 65 || e.keyCode > 90)) {
    currentBox.value = "";
    return;
  }

  let nextBox = currentBox.nextElementSibling;
  let prevBox = currentBox.previousElementSibling;

  if (nextBox == null) {
    if (e.keyCode === 13) {
      var currentRow = currentBox.parentElement;
      checkInput(currentRow);
    }
  } else if (currentBox.value.length >= currentBox.maxLength) {
    nextBox.focus();
    nextBox.select();
  } else if (currentBox.value.length === 0 && prevBox != null) {
    prevBox.focus();
    prevBox.select();
  }
}

function checkInput(currentRow) {
  let entry = "";
  let wordCheck = myWord.slice();

  for (let i = 0; i < currentRow.children.length; i++) {
    let letter = currentRow.children[i].value
    entry += letter;
    let letterKey = document.getElementById(letter + "Key");
    if (letter === myWord.charAt(i)) {
      currentRow.children[i].classList.add("correct");
      letterKey.classList.add("correct");
      wordCheck = wordCheck.replace(letter, "");
    }
  }

  for (let i = 0; i < currentRow.children.length; i++) {
    let letter = currentRow.children[i].value
    let letterKey = document.getElementById(letter + "Key");
    if (wordCheck.includes(letter)) {
      currentRow.children[i].classList.add("included");
      letterKey.classList.add("included");
      wordCheck = wordCheck.replace(letter, "");
    } else {
      if (!currentRow.children[i].classList.contains("correct")) {
        currentRow.children[i].classList.add("incorrect");
      }
      if (!(letterKey.classList.contains("correct") || letterKey.classList.contains("included"))) {
        letterKey.classList.add("incorrect");
      }
    }
  }

  if (entry === myWord) {
    let resBox = document.getElementById("result-notice");
    resBox.classList.remove("hide-result");
    resBox.classList.add("display-result");
  } else {
    let nextRow = currentRow.nextElementSibling;
    if (nextRow == null) {
      let resBox = document.getElementById("result-notice");
      resBox.innerHTML = "Oops... Try again!<br />Correct word: " + myWord.toUpperCase();
      resBox.classList.remove("hide-result");
      resBox.classList.add("wrong-final");
      resBox.classList.add("display-result");
    } else {
      nextRow.firstElementChild.focus();
      nextRow.firstElementChild.select();
    }
  }
}