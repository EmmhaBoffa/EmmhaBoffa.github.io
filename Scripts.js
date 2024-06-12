document.addEventListener("DOMContentLoaded", function() {
    const videoElement = document.getElementById('myVideo');
    const videoSource = document.getElementById('videoSource');
  
    const videos = [
      'imagen/Videos1.mp4/Videos1.mp4',
      'imagen/Videos1.mp4/Videos2.mp4',
      'imagen/Videos1.mp4/Videos3.mp4'
    ];
  
    let currentVideoIndex = 0;
  
    videoElement.addEventListener('ended', () => {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      videoSource.src = videos[currentVideoIndex];
      videoElement.load();
      videoElement.play();
    });
  });
  
