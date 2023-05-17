async function geoInit(mainDiv, objParam) {
  console.log('geoInit mainDiv=', mainDiv, objParam);
  // mainDiv.innerHtml = '';
  mainDiv.textContent = '';
  // while (mainDiv.firstChild) {
  //   mainDiv.removeChild(mainDiv.lastChild);
  // }
  const spinner = document.createElement('div');
  spinner.classList.add('loading');
  mainDiv.appendChild(spinner);
}
