document.getElementById('openNav').onclick = function() { w3_open(); };

function w3_open() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("openNav").style.display = 'none';
}

function w3_close() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("openNav").style.display = "inline-block";
}
