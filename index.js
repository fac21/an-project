const speechObj = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector("#speak");
const stopBUtton = document.querySelector("#stop");

const setSpeechText = (text) => (speechObj.text = text);

function populateVoices(){
    voices = this.getVoices() // this = target of event
    voicesDropdown.innerHTML = voices
    .map(voice => `<option value= "${voice.name}">${voice.name} (${voice.lang})</option>`)
     .join(" ")
    
}

function setVoice(){
   speechObj.voice = voices.find(voice => voice.name === this.value)
   toggle();  
}

function toggle(startOver = true){
    speechSynthesis.cancel();
    if (startOver){
        speechSynthesis.speak(speechObj)
    }

}

function setOption(){
    speechObj[this.name] = this.value;
   toggle()
}

setSpeechText("Hi Nafisa and Antonio");

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach(option => option.addEventListener("change", setOption))
speakButton.addEventListener("click", toggle)
stopBUtton.addEventListener("click", function(){
    toggle(false);
});

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

