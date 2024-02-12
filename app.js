



let playBtn=document.querySelector('#playBtn');
let progress=document.querySelector('#progress');
let songList=document.querySelector('.list');
let controls=document.querySelector('.controls');
let songText=document.querySelector('#songText');
let prev=document.querySelector('#prev');
let next=document.querySelector('#next');
let shuffle=document.querySelector('#shuffle');
let restart=document.querySelector('#restart');


progress.value=0;

let arr=['Pehle Bhi Main','Haiwaan','Satranga','Arjan Vailly','Hua Main'];

// constructor
const audio = new Audio('./assets/Pehle Bhi Main.mp3');

// play btn click
playBtn.addEventListener('click',function(){
    audio.paused?audio.play():audio.pause();
    if(playBtn.children[0].classList.contains('fa-play')){
        playBtn.children[0].classList.remove('fa-play');
        playBtn.children[0].classList.add('fa-pause');
    }
    else{
        playBtn.children[0].classList.remove('fa-pause');
        playBtn.children[0].classList.add('fa-play');
    }
});


// calculating current time
audio.addEventListener('timeupdate',function(){
    const currProg=audio.currentTime*100/audio.duration;
    progress.value=currProg;
})

// adjusting progress
progress.addEventListener('change', function(){
    const updTime=progress.value*audio.duration/100;
    audio.currentTime=updTime;
})

// selecting song to play
songList.addEventListener('click',function(e){
    if(e.target.nodeName==='DIV'){
        let songName=e.target.innerText;
        audio.src=`./assets/${songName}.mp3`;
        audio.currentTime=0;
        audio.play();
        playBtn.children[0].classList.remove('fa-play');
        playBtn.children[0].classList.add('fa-pause');
        songText.innerText=songName;
    }
})

// prev or next song play

function butts(id){
    let songName=arr[id];
    audio.src=`./assets/${songName}.mp3`;
    audio.currentTime=0;
    audio.play();
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
    songText.innerText=songName;
}

next.addEventListener('click',function(){
    progress.value=0;
    let id=arr.indexOf(songText.innerText);
    if(id===arr.length-1){
        id=0;
        butts(id);
    }
    else if(id<arr.length-1){
        butts(id+1);
    }
})

prev.addEventListener('click',function(){
    progress.value=0;
    let id=arr.indexOf(songText.innerText);
    if(id===0){
        id=0;
        butts(id);
    }
    if(id>0){
        butts(id-1);
    }
})
restart.addEventListener('click',function(){
    audio.currentTime=0;
    progress.value=0;
    audio.play();
})
shuffle.addEventListener('click',function(){
    let id=Math.floor(Math.random()*arr.length);
    butts(id);
})