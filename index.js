const speechObj = new SpeechSynthesisUtterance();
let voices = [];
let quotes = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const generateQuoteButton = document.querySelector("#generateQuote");
const blockquote = document.querySelector("blockquote");

const setSpeechText = (text) => (speechObj.text = text);

function populateVoices() {
  voices = this.getVoices(); // this = target of event
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value= "${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join(" ");
}

function setVoice() {
  speechObj.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(speechObj);
  }
}

function setOption() {
  speechObj[this.name] = this.value;
  toggle();
}

function generateQuote() {
    const quote = choseRandomQuote(quotes);
    const quoteText = document.querySelector("#quote-text")
    const quoteAuthor= document.querySelector("#quote-author")

    const quoteSample = `${quote.text} --- ${
      quote.author ? quote.author : "Unknown"
    }`;
    quoteText.textContent = quote.text;
    quoteAuthor.textContent= quote.author
  
    setSpeechText (quoteSample);
  }
  
  function choseRandomQuote(quotesArray) {
    const index = Math.floor(Math.random() * (quotesArray.length - 1));
    return quotesArray[index];
  }
  
speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", function () {
  toggle(false);
});
generateQuoteButton.addEventListener("click", generateQuote);


fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => {
    quotes = data;
  })
  .catch((error) => console.log(error));
