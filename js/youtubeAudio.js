function onYouTubeIframeAPIReady() {
	var audioDiv = document.getElementById('youtube-audio');
	var icon = document.getElementById('play-icon');

	var div = document.createElement('div');
	div.setAttribute('id', 'youtube-player');
	audioDiv.appendChild(div);

	var toggleButton = function(play) {
		var img = play ? "icons/pause.png" : "icons/play.png"
		icon.src = img;
	}

	audioDiv.onclick = function() {
		if (player.getPlayerState() === YT.PlayerState.PLAYING || player.getPlayerState() === YT.PlayerState.BUFFERING) {
			player.pauseVideo();
			toggleButton(false);
		} else {
			player.playVideo();
			toggleButton(true);
		}
	}

	var player = new YT.Player('youtube-player', {
		height: '0',
		width: '0',
		videoId: 'IDZkdkPHQ00',
		playerVars: {
			autoplay: audioDiv.dataset.autoplay,
			loop: audioDiv.dataset.loop,
		},
		events: {
			'onReady': function(e) {
				player.setPlaybackQuality('small');
				toggleButton(player.getPlayerState() !== YT.PlayerState.CUED);
			},
			'onStateChange': function(e) {
				if (e.data === YT.PlayerState.ENDED) {
					toggleButton(false);
				}
			}
		}
	});
}