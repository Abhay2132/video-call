const wait = (n=0) => new Promise(a => setTimeout(a, n));

function showSnackBar (msg) {
    var snackbar = document.querySelector(".snackbar");
    document.querySelector(".snackbar-con").style.display = "block";
    document.querySelector(".snackbar > span").textContent = msg;
    setTimeout(() =>  snackbar.style.top = "0", 0);
    setTimeout(hideSnackBar, 5000);
}

function hideSnackBar () {
    var snackbar = document.querySelector(".snackbar");
    snackbar.style.top = "44px"
    setTimeout(() =>   document.querySelector(".snackbar-con").style.display = "none", 200);
}

(async function () {
	while(document.readyState != "complete") await wait(200);
	
	document.body.innerHTML += `
	<div class="snackbar-con">
    <div class="snackbar">
        <span> This is a SnackBar</span>
        <button onclick="hideSnackBar()">OK</button>
    </div>
    </div>
   `
   await wait();
   hideSnackBar ();
})();