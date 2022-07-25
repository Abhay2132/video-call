var myPeerConn;
var facingMode = "user";
var mediaConstraints = { audio: true, video: { facingMode } };
var src;
var socket = io("https://videocall21.herokuapp.com");
var myUsername
var targetUsername
var remote = document.querySelector("#remote");
var local = document.querySelector("#local");

const qs = (a) => document.querySelector(a);

function setCameraMirror() {
	if (facingMode == "user") {
		local.style.transform = "scaleX(-1)";
	} else {
		local.style.transform = "scaleX(1)";
	}
}

async function setCamera(f = false) {
	if (f) {
		if (facingMode == "user") facingMode = "environment";
		else facingMode = "user";
	}
	mediaConstraints.video = { facingMode };
	if (src) src.getVideoTracks().forEach((t) => t.stop());
	src = await window.navigator.mediaDevices.getUserMedia(mediaConstraints);
	local.srcObject = src;
	setCameraMirror();

	if (myPeerConn && f) {
		let videoTrack = src.getTracks().find((track) => track.kind == "video");
		myPeerConn.getSenders().forEach((sender) => {
			if (sender.track.kind == "video") {
				sender.replaceTrack(videoTrack);
				//console.log("Replaced Track !");
			}
		});
	}
}

var muted = false;
function toggleMute() {
	if (!myPeerConn) return;
	muted = !muted;
	let sndrs = myPeerConn.getSenders();
	sndrs.forEach((s) => {
		if (s.track.kind == "audio") s.track.enabled = !muted;
		let info = {};
		info[s.track.kind] = s.track.enabled;
		console.log(info);
	});
	if (muted) qs(".mute").style.background = "#ddd";
	else qs(".mute").style.background = "transparent";
}

var video = true;
function toggleVideo() {
	if (!myPeerConn) return;
	let sndrs = myPeerConn.getSenders();
	video = ! video;
	sndrs.forEach((s) => {
		if (s.track.kind == "video") s.track.enabled = video;
		let info = {};
		info[s.track.kind] = s.track.enabled;
		console.log(info);
	});
	qs(".toggle-video").style.background = video ? "transparent" : "#ddd";
}

var istoggleSrc = false;
function toggleSrc () {
	let lc = local.className
	let rc = remote.className
	
	local.className = rc;
	remote.className = lc;
}
