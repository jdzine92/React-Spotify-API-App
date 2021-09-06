//SENSITIVE API DATA
const clientId = '92d2530c1e4c48519f2060e67a4e80b4';
const redirectUri = 'http://localhost:3000';
//hold users access token
let accessToken = '';


const Spotify = {
	getAccessToken() {
		//if access token exists, return token
		if (accessToken) {
			return accessToken;
		}
		
		//check for access token match (window location returns the url for current page)
		//match token using regEx
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		//capture when token expires using regEx
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		//if both exist in URL, assign values
		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);
			//clear params after (so token isnt grabbed after expiry) (grabs new one when expired)
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},

	search(input) {
		const accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${input}`,
			{ headers: {
				Authorization: `Bearer ${accessToken}`
			}
		//return response as json
		}).then(response => {
			return response.json();
		//with json response, check if response is false (no matching tracks exist) return empty array
		}).then(jsonResponse => {
			if (!jsonResponse.tracks) {
				return [];
			}
			//else return map of json response objects 
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}));
		});
	},

	savePlaylist(name, trackUris) {
		//if empty return null
		if (!name || !trackUris.length) {
			return;
		}

		//current users access token
		const accessToken = Spotify.getAccessToken();
		//header for access token
		const headers = { Authorization: `Bearer ${accessToken}`};
		//empty var for user id
		let userId;

		//return a promise, convert to json, assign json response to user id
		return fetch('https://api.spotify.com/v1/me', { headers: headers }
			).then(response => response.json()
			).then(jsonResponse => {
				userId = jsonResponse.id;
				//pass in user id and object (name of playlist), convert to json and assign to playlistId
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
					{
						headers: headers,
						method: 'POST',
						body: JSON.stringify({ name: name })
					}).then(response => response.json()
					).then(jsonResponse => {
					const playlistId = jsonResponse.id;
					//return promise, create new playlist in user account
					return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
						headers: headers,
						method: 'POST',
						body: JSON.stringify({uris: trackUris})
					})
					})
			})
	}

}

export default Spotify;