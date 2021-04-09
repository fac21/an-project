const speechObj = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakButton = document.querySelector("#speak");
const stopBUtton = document.querySelector("#stop");

const setSpeechText = (text) => (speechObj.text = text);


setSpeechText("Hi Nafisa and Antonio");

