// content.js
function autoAdmit() {
   for (let element of document.getElementsByTagName('span')) {
       if (element.innerHTML === '接受') {
           element.click();
       }
   }
}

setInterval(autoAdmit, 1000);