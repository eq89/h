function removeTextAfterImg(text) {
	const index = text.indexOf('<img');
	if (index !== -1) {
		return text.substring(0, index);
	}
	return text;
}

function checkElement() {
	var elementW = document.querySelector('.wheel-winner');
	var elementT = document.querySelector('.wheel-target');
	var elemText = '';

	if (elementW) {
		elemText = removeTextAfterImg(elementW.firstChild.textContent);
		elementW.firstChild.textContent = elemText;
	}

	if (elementT !== undefined && elementT !== null) {
		if(elementT.childNodes.length >= 2) {
			elementT.removeChild(elementT.childNodes[1]);
		}
	}
}

setInterval(checkElement, 250);
