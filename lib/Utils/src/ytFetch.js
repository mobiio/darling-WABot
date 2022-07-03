const YTDL_CORE = require("ytdl-core");
const YT_SEARCH = require("yt-search");

async function downloadMp3(url) {
	return new Promise(async (resolve, reject) => {
		try {
			const id = await YTDL_CORE.getVideoID(url);
			const yutub = await YTDL_CORE.getInfo(`https://www.youtube.com/watch?v=${id}`)
				.then((data) => {
					let pormat = data.formats;
					let audio = [];
					for (let i = 0; i < pormat.length; i++) {
						if (pormat[i].mimeType == "audio/webm; codecs=\"opus\"") {
							let aud = pormat[i];
							audio.push(aud.url);
						}
					}
					const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
					const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
					const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
					const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
					const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;

					const result = {
						title: title,
						thumb: thumb,
						channel: channel,
						published: published,
						views: views,
						link: audio[1]
					};
					return (result);
				});
			resolve(yutub);
		} catch (error) {
			reject(error);
			console.log(error);
		}

	});
}

async function downloadMp4(url) {
	return new Promise(async (resolve, reject) => {
		try {
			const id = await YTDL_CORE.getVideoID(url);
			const yutub = await YTDL_CORE.getInfo(`https://www.youtube.com/watch?v=${id}`)
				.then((data) => {
					let pormat = data.formats;
					let video = [];
					for (let i = 0; i < pormat.length; i++) {
						if (pormat[i].container == "mp4" && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
							let vid = pormat[i];
							video.push(vid.url);
						}
					}
					const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
					const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
					const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
					const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
					const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;

					const result = {
						title: title,
						thumb: thumb,
						channel: channel,
						published: published,
						views: views,
						link: video[0]
					};
					return (result);
				});
			resolve(yutub);
		} catch (error) {
			reject(error);
			console.log(error);
		}

	});
}

async function playMp3(query) {
	return new Promise(async (resolve, reject) => {
		try {
			const search = await YT_SEARCH(query)
				.then(async (data) => {
					const url = [];
					const pormat = data.all;
					for (let i = 0; i < pormat.length; i++) {
						if (pormat[i].type == "video") {
							let dapet = pormat[i];
							url.push(dapet.url);
						}
					}
					const id = await YTDL_CORE.getVideoID(url[0]);
					const yutub = await YTDL_CORE.getInfo(`https://www.youtube.com/watch?v=${id}`)
						.then((data) => {
							let pormat = data.formats;
							let audio = [];
							let video = [];
							for (let i = 0; i < pormat.length; i++) {
								if (pormat[i].mimeType == "audio/webm; codecs=\"opus\"") {
									let aud = pormat[i];
									audio.push(aud.url);
								}
							}
							const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
							const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
							const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
							const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
							const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;
							const result = {
								title: title,
								thumb: thumb,
								channel: channel,
								published: published,
								views: views,
								link: audio[0],
							};
							return (result);
						});
					return (yutub);
				});
			resolve(search);
		} catch (error) {
			reject(error);
			console.log(error);
		}

	});
}

async function playMp4(query) {
	return new Promise(async (resolve, reject) => {
		try {
			const search = YT_SEARCH(query)
				.then((data) => {
					const url = [];
					const pormat = data.all;
					for (let i = 0; i < pormat.length; i++) {
						if (pormat[i].type == "video") {
							let dapet = pormat[i];
							url.push(dapet.url);
						}
					}
					const id = YTDL_CORE.getVideoID(url[0]);
					const yutub = YTDL_CORE.getInfo(`https://www.youtube.com/watch?v=${id}`)
						.then((data) => {
							let pormat = data.formats;
							let video = [];
							for (let i = 0; i < pormat.length; i++) {
								if (pormat[i].container == "mp4" && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
									let vid = pormat[i];
									video.push(vid.url);
								}
							}
							const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText;
							const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
							const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName;
							const views = data.player_response.microformat.playerMicroformatRenderer.viewCount;
							const published = data.player_response.microformat.playerMicroformatRenderer.publishDate;
							const result = {
								title: title,
								thumb: thumb,
								channel: channel,
								published: published,
								views: views,
								link: video[0],
							};
							return (result);
						});
					return (yutub);
				});
			resolve(search);
		} catch (error) {
			reject(error);
			console.log(error);
		}

	});
}

async function ytSearch(query) {
	return new Promise(async (resolve, reject) => {
		try {
			const cari = await YT_SEARCH(query)
				.then((data) => {
					res = data.all;
					return res;
				});
			resolve(cari);
		} catch (error) {
			reject(error);
			console.log(error);
		}

	});
}

module.exports = {
	downloadMp3,
	downloadMp4,
	playMp3,
	playMp4,
	ytSearch
};
