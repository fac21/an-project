const speechObj = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector("#speak");
const stopBUtton = document.querySelector("#stop");

const setSpeechText = (text) => (speechObj.text = text);

setSpeechText("Hi Nafisa and Antonio");

//fetch of the api section

function choseRandomQuote(quotesArray) {
  const index = Math.floor(Math.random() * (quotesArray.length - 1));
  return quotesArray[index];
}

fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => choseRandomQuote(data))
  .then((quote) =>
    setSpeechText(
      `${quote.text} --- ${quote.author ? quote.author : "Unknown"}`
    )
  )
  .then(console.log(speechObj))
  .catch(console.log(error));
