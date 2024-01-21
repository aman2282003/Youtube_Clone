const videocardcontainer = document.querySelector(".video-wrapper")
let api_key = "AIzaSyBtbOwBmAdewrZC6G4O3Tks7TtNWVkOuCo"
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


fetch(
    video_http + new URLSearchParams({
        part : "snippet, contentDetails, statistics, player",
        chart : "mostPopular",
        maxResults : 50,
        regionCode  : "IN",
        key : api_key
    })
).then((res) => res.json())
.then((data) =>{
    data.items.forEach((item) =>{
        getChannelIcon(item);
    })
})
.catch((err) => console.log(err));


const getChannelIcon = (video_data) =>{
    fetch(
        channel_http + new URLSearchParams({
            key : api_key,
            part : "snippet",
            id : video_data.snippet.channelId,
        }) 
    )
    .then((res) => res.json())
    .then((data) =>{
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makevideocard(video_data)
    })
    
}


const playvideo = (embedHtml) =>{
    sessionStorage.setItem("videoEmbedHtml", embedHtml)
    window.location.href = "video.html"
}


const makevideocard = (data) =>{
    const videoCard = document.createElement("div")
    videoCard.classList.add("video")
    videoCard.innerHTML = `
    
                <div class="video-content">
                    <img src="${data.snippet.thumbnails.high.url}" class= "thumbnail" alt = "video">
                </div>
                <div class="video-details">
                    <div class="channel-logo">
                        <img src="${data.channelThumbnail}" alt = "channel-logo" class="channel-icon">
                    </div>
                    <div class="details">
                        <h3 class = "title">${data.snippet.title}</h3>
                        <div class="channel-name">${data.snippet.channelTitle}       </div>
                    </div>
                </div>

    `
    videoCard.addEventListener("click", () =>{
        playvideo(data.player.embedHtml)
    });
    videocardcontainer.appendChild(videoCard)
}




