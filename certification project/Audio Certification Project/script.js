/****ELEMENT****/
const btns = document.querySelectorAll(".drum-pad>button");
const audios = document.querySelectorAll(".clip");
const showResult = document.getElementById("display");
const powerControl = document.getElementById("power-control");
const powerControlLabel = document.getElementById("power-control-label");
const volumeControlLabel = document.getElementById("volume-control-label");
const volumeControlInput = document.getElementById("volume-control-input");

/****DATA****/
const myObj = {
  Q: "Heater 1",
  W: "Heater 2",
  E: "Heater 3",
  A: "Heater 4",
  S: "Clap",
  D: "Open-HH",
  Z: "Kick-n'-Hat",
  X: "Kick",
  C: "Closed-HH"
};

/****FUNCTION****/
const showDrumName = (ele) => showResult.innerHTML = myObj[ele.innerText]
const changePowerControlClass = (ele) => {
  powerControlLabel.innerText.split(":")[1] === "Off" ?
  powerControlLabel.innerText = "Power Control:On" :
  powerControlLabel.innerText = "Power Control:Off";
  ele.classList.toggle("power-off");
}
const changeVolumn = () => {
  volumeControlLabel.innerText =  `Volumn:${volumeControlInput.value}`;
}

/****LISTENER****/
audios.forEach(audio=>{
  audio.parentElement.addEventListener("click",(e)=>{
    audio.play();
    showDrumName(e.target);
  });
});

//监听器的keydown事件只能绑定在<input><textarea><select>加了tabindex的div/button上,其他绑了也无效
document.addEventListener("keydown",(e)=>{
  audios.forEach(audio=>{
    if(audio.parentElement.innerText === e.key.toUpperCase()){
      audio.play();
      showDrumName(audio.parentElement);
    }
  });
});

//电源开关
audios.forEach(audio=>{
  powerControl.addEventListener("click",(e)=>{
    changePowerControlClass(e.target);
    audio.muted = !audio.muted;
  });
});

//音量控制
audios.forEach(audio=>{
  volumeControlInput.addEventListener("input",()=>{
    audio.volume = volumeControlInput.value / 100;
    changeVolumn();
  });
})


/****RECORDS****/
/* audio.volume */
/* audio.muted */


