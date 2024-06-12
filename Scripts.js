document.addEventListener("DOMContentLoaded", function() {
    const videoElement = document.getElementById('myVideo');
    const videoSource = document.getElementById('videoSource');
  
    const videos = [
      '//emmha/Users/Public/Scripts/Videos1.mp4',
      '//emmha/Users/Public/Scripts/Videos2.mp4',
      '//emmha/Users/Public/Scripts/Videos3.mp4'
    ];
  
    let currentVideoIndex = 0;
  
    videoElement.addEventListener('ended', () => {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      videoSource.src = videos[currentVideoIndex];
      videoElement.load();
      videoElement.play();
    });
  });
  
