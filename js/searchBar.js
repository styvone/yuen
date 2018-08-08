// search bar processing
function buildURL(inputString) {
	const reqURL = 'https://www.googleapis.com/youtube/v3/search?';
	const key = 'AIzaSyDxh3kaGDIm8HagG7MGCchvcY5jLpDSHoM';
	let resURL = reqURL + 'part=snippet&maxResults=5&order=relevance&';
	resURL += 'q='+encodeURIComponent(inputString+' lyric video').replace(/%20/g, "+");
	resURL += '&type=video&key=' + key;
	return (resURL);
}
function loading(loadedAudio) {
	var x = document.getElementById('spinner');
	if (loadedAudio) {
		x.style.display = 'none';
	} else {
		x.style.display = 'block';
	}
}
function clearSearch() {
	while (mountDiv.firstChild) {
	    mountDiv.removeChild(mountDiv.firstChild);
	}
}
var mountDiv = document.getElementById('mountPoint');
$('#searchBar').keyup(function(e) {
	const inputRaw = document.querySelector('#searchBar').value;
	const inputString = String(inputRaw);
	if (e.which === 8) {
		return (false);
	}
	if (e.which === 13) {
		while (mountDiv.firstChild) {
		    mountDiv.removeChild(mountDiv.firstChild);
		}
		fetch(buildURL(inputString), {
			method: 'GET',
		})
		.then(response => response.json())
		.then(json => {
			if (json.items.length > 0) {
				let i = 0;
				while (i < 5) {
					const vidID = json.items[i].id.videoId;
					const title = json.items[i].snippet.title;
					mountDiv = document.getElementById('mountPoint');
					var searchDiv = document.createElement('li');
					searchDiv.setAttribute('class', 'dropElement');
					searchDiv.innerHTML = title;
					searchDiv.addEventListener('click', function() {
						loading(false);
						loadSound(vidID);
						$('#searchBar').val(title);
						clearSearch();
					});
					mountDiv.appendChild(searchDiv);
					i++;
				};
			}
		});
	}
});
$('#searchBarDiv, #title, canvas').click(function(e) {
	if (mountDiv.firstChild || $('#searchBar').val()) {
		$('#searchBar').val('');
		clearSearch();
	}
});
$('#searchBar').click(function(e) {
	e.stopPropagation();
});