function addtext() {
	if (document.getElementById("input-value").value.length === 0) return;
	document.getElementById("text-show").value += ' ' + document.getElementById("input-value").value;
	
	document.getElementById("input-value").value = '';
};

function deltext() {
	document.getElementById("text-show").value = document.getElementById("text-show").value.slice(0, -1) ;
	
};

function actext() {
	document.getElementById("text-show").value = '';
	
};

document.getElementById('input-value').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addtext();
    }
});
