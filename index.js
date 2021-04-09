const speechObj = new SpeechSynthesisUtterance();
let voices = [];
let quotes=[]
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector("#speak");
const stopBUtton = document.querySelector("#stop");
const getQuote = document.querySelector("#generateQuote")

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
getQuote.addEventListener("click",choseRandomQuote)



//fetch of the api section
function generateQuote(){
    choseRandomQuote(data)
    setSpeechText(
        `${quote.text} --- ${quote.author ? quote.author : "Unknown"}`
      )
    
}

function choseRandomQuote(quotesArray) {
  const index = Math.floor(Math.random() * (quotesArray.length - 1));
  return quotesArray[index];

}

 fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => quotes = data)
  .then(console.log(quotes))
  .catch((error) => console.log(error));
