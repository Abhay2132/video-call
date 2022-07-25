function vc_ui_init() {
	const qs = (a) => document.querySelector(a);
	const h = window.innerHeight;
	qs(".vcc").style.height = h + "px";
	qs(".fs-dialog-box").style.height = h + "px";
	qs(".users").style.height = "50px";
	qs(".vcp").style.height = h - 100 + "px";
	qs(".controls").style.height = "50px";
}
vc_ui_init();
setInterval(vc_ui_init, 1000);

var reverted = true;
function revert(tag) {
	reverted = !reverted;
	tag.style.transform = `scaleX(${reverted ? 1 : -1})`;
}
