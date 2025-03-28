
var folder='cs';
var songs1=[["Tere Mast Mast Do Nain - Dabangg 320 Kbps.mp3"],["Patola - Blackmail 320 Kbps.mp3","Lagdi Lahore Di - Street Dancer 3D 320 Kbps.mp3","High Rated Gabru Guru Randhawa 320 Kbps.mp3"],["[Songs.PK] Ra.One - 15 - Chammak Challo (Remix).mp3"]];
var song1="";
var index=0;
function convertSecondsToMinSec(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    
}
let currSong= new Audio();
async function getsongs(e){
    let songs=songs1[e];
    ele=document.querySelector(".songList").getElementsByTagName("ul")[0];
    ele.innerHTML="";
    for (const song of songs) {
        ele.innerHTML=ele.innerHTML+
       ` <li><img class="invert logo2 p1" src="./music-svgrepo-com.svg" alt="">
                <div class="songinfo">
                    <div>${song}</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
            <img class="logo2 invert" src="./play-svgrepo-com.svg" alt=""></div></li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click",(e)=>{
           
            for(const song of songs){
                if(
                    element.querySelector(".songinfo").firstElementChild.innerHTML==song){
                   document.querySelector(".songInfo").innerHTML=element.querySelector(".songinfo").firstElementChild.innerHTML;
                   document.querySelector(".duration").innerHTML="00:00/00:00";
                    playMusic(song);
                }
            }
        });
    });
}
const playMusic=(audio,pause=false)=>{
    currSong.src = audio;
    if(!pause){
        currSong.play();
        play.src="./pause.svg";
    }
   
    console.log(decodeURI(audio));
    song1=decodeURI(audio);
    document.querySelector(".songInfo").innerHTML=audio;
    document.querySelector(".duration").innerHTML="00:00/00:00";
}
async function getalbum(){
    // let s= await fetch(`Spotify-clone/tree/main/Songs`);
    // let a = await s.text();
    // let div=document.createElement("div");
    // div.innerHTML=a;
    // let anchor=div.getElementsByTagName("a");
    let anchor = [1,2,3];
    let cardContainer = document.querySelector(".spotifyPlaylist")
    Array.from(anchor).forEach( async e=>{
            let s= await fetch(`./info${e}.json`);
            let a = await s.json();
            cardContainer.innerHTML=cardContainer.innerHTML+
            `<div data-folder=${e} class="card run">
            <div class="circle1"><img src="./play1.svg" alt=""></div>
            <img src="./cover${e}.JPG" alt="">
            <h4 class="he">${a.title}</h4>
            <p class="dis">${a.discription}</p>
        </div>`
    })
}
async function main(){
    await getalbum();
    await getsongs(0);
    playMusic(songs1[0][0],true);
   
    play.src="./play-svgrepo-com.svg"
    play.addEventListener("click",()=>{
        if(currSong.paused){
            currSong.play()
            play.src="./pause.svg"
            
        }
        else{
            currSong.pause()
            play.src="./play-svgrepo-com.svg"
        }
    })
    currSong.addEventListener("timeupdate",()=>{
        document.querySelector(".duration").innerHTML=`${convertSecondsToMinSec(currSong.currentTime)} / ${convertSecondsToMinSec(currSong.duration)}`;
        document.querySelector(".circle2").style.left=((currSong.currentTime)/(currSong.duration))*100+"%";
    })
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle2").style.left=percent+"%";
        currSong.currentTime=(currSong.duration*percent)/100
    })
   
    document.querySelector("#prev").addEventListener("click",(e)=>{
        if(songs1[index].indexOf(song1)-1>=0){
            playMusic(songs1[index][songs1[index].indexOf(song1)-1]);
        }else{
            playMusic(songs1[index][0])
        }
    })
    document.querySelector("#next").addEventListener("click",(e)=>{
        if(songs1[index].indexOf(song1)+1<songs1[index].length){
            playMusic(songs1[index][songs1[index].indexOf(song1)+1]);
        }
        else{
            playMusic(songs1[index][0])
        }
    })
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        currSong.volume=parseInt(e.target.value)/100;
    })
    setTimeout(() => {
        Array.from(document.getElementsByClassName("card")).forEach(e=>{
            console.log(e);
            e.addEventListener("click",async i=>{
                folder=i.currentTarget.dataset.folder;
                console.log(folder-1)
              await getsongs(folder-1);
              index=folder-1;
              playMusic(songs1[index][0]);
            })
        })
    }, 1000); // Adjust delay based on when elements are added
    
    // document.addEventListener("DOMContentLoaded", () => {
    //     const cards = console.log(document.getElementsByClassName("card"));
    //     console.log(cards); // Now accessible
    // });
    // console.log(Array.from(document.getElementsByClassName("card")));
    
    document.querySelector(".vol").addEventListener("click",e=>{
        if(e.target.src.includes("volume-max-svgrepo-com.svg")){
            e.target.src=e.target.src.replace("volume-max-svgrepo-com.svg","mute.svg");
            currSong.volume=0;
            document.querySelector(".range").getElementsByTagName("input")[0].value=0
        }
        else{
            e.target.src=e.target.src.replace("mute.svg","volume-max-svgrepo-com.svg");
            currSong.volume=0.10;
            document.querySelector(".range").getElementsByTagName("input")[0].value=10
        }
    })
    document.querySelector(".hamberger").addEventListener("click",e=>{
        if(document.querySelector(".left.box").style.left=="0"){
        document.querySelector(".left.box").style.left="-110%";
       }
        else{
            document.querySelector(".left.box").style.left="0";
        }
    })
    document.querySelector(".close").addEventListener("click",e=>{
        document.querySelector(".left.box").style.left="-110%";
    })
}
main();
