console.log("Welcome to Spotify, We are starting our JavaScript Part ");

// Initializing variables
let songIndex = 0;
let audioElement = new Audio('musics/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let progress = 0;
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');



let songs = [
    { songName: "Mera Dil Bhi kitna Pagal Hai", filePath: "musics/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Tum Prem ho Tum Preet ho", filePath: "musics/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Sab Tera | Me to tere rang me", filePath: "musics/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Keh doon tumhe ya Chup rahu", filePath: "musics/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Jab Koi Baat Bigardh jaye", filePath: "musics/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Me Tenu Samjhava Kee ", filePath: "musics/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Khamoshiyaan", filePath: "musics/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Haan Seekha Mene Jeena", filePath: "musics/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Hum Mar Jayenge", filePath: "musics/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Bol Do na Jara dil Me jo hai Chipa", filePath: "musics/4.mp3", coverPath: "covers/10.jpg" },
]


// Iterating over html element collection as well as JavaScript Array 
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // perticular element ke andar <img> tag ko set karna
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // perticular element ke andar "songName" class ko set karna
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        console.log("test passed");
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makeAllPlay();
        gif.style.opacity = 0;
    }
})

// Listening to Events of moving slider of progress bar (updating seeker) 
audioElement.addEventListener('timeupdate',()=>{ // timeupdate event tab occour hota hai jab perticular element se associated main time change hota hai.

    //updating seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100); // calculating percentage of song played
    myProgressBar.value = progress; // our progressBar accepts value b/w 0 to 100;
})

// Listening to the event of changing the value of myProgressBar and upditing song.
myProgressBar.addEventListener('change',()=>{
    // actually kya hota hai , hume myProgressBar se jo value milti hai, vo 0 to 100 ke range me 
    // hoti hai, but hume song ke time ko update kare ke liye song duration ki range wali value 
    // chahiye hai (means if song length is of 5 min so required number should b/w 0 to 5 min not 0 to 100)

    console.log("myProggressBar value => ",myProgressBar.value)
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100; // finding Adope if percentage is given :)

})

// mading all list icons as play 
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
        
    })
}

// Listening to event of clicking play buttone of list items
Array.from(document.getElementsByClassName('songItemPlay')).forEach( (element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `musics/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Lestening to event of clicking next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
        console.log("reached to last ");
    }
    else{
        songIndex += 1;
        console.log("Song Incremented ");
    }
    audioElement.src = `musics/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle')
    console.log("playing ",songIndex," song");
})


// Lestening to event of clicking previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
        console.log("reached to top ");
    }
    else{
        songIndex -= 1; 
        console.log("Song Decremented ");
    }
    audioElement.src = `musics/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle')
    console.log("playing ",songIndex," song");
})


