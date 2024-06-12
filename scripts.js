document.addEventListener("DOMContentLoaded", function() {
    const videoElement = document.getElementById('myVideo');
    const videoSource = document.getElementById('videoSource');
    const startButton = document.getElementById('startButton');
  
    const videos = [
      'imagen/Videos1.mp4',
      'imagen/Videos2.mp4',
      'imagen/Videos3.mp4'
    ];
  
    let currentVideoIndex = 0;

    function playNextVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      videoSource.src = videos[currentVideoIndex];
      videoElement.load();
      videoElement.play();
    }
  
    videoElement.addEventListener('ended', playNextVideo);

    startButton.addEventListener('click', function() {
      videoElement.play();
    });
  });

  
