async function cardsInit(mainDiv, objParam) {
  console.log('cardsInit mainDiv=', mainDiv, objParam);
  // mainDiv.innerHtml = '';
  mainDiv.textContent = '';
  // while (mainDiv.firstChild) {
  //   mainDiv.removeChild(mainDiv.lastChild);
  // }
  const spinner = document.createElement('div');
  spinner.classList.add('loading');
  mainDiv.appendChild(spinner);
  currIssueData = await cardsLoadJSON(objParam.url);
  mainDiv.textContent = '';
  console.log('cardsInit currIssueData=', currIssueData);
  const container = document.createElement('div');
  container.style.width = '95%';
  container.style.height = '95%';
  container.style.textAlign = 'center';
  container.style.display = 'grid';
  container.style.position = 'relative';
  container.style.gridTemplateColumns = '1fr';
  container.style.gridTemplateRows = '5fr 1fr 3fr';
  const issues = document.createElement('div');
  issues.id = 'currIssues';
  issues.style.width = '100%';
  issues.style.textAlign = 'center';
  issues.style.alignItems = 'center';
  issues.style.justifyContent = 'center';
  issues.style.display = 'grid';
  issues.style.gridTemplateColumns = '1fr 1fr';
  const cardsN = Math.min(4, currIssueData.cards.length);
  for (let i = 0; i < cardsN; i++) {
    const qId = cardsGetQuestionId();
    if (!qId) break;
    const q = currIssueData.cards.find((el) => el.id === qId);
    console.log('cardsGetQuestionId()', qId, q);
    if (!q) {
      console.error('Не найден вопрос');
      continue;
    }
    q.showing = 1;
    const card = document.createElement('div');
    card.id = 'card' + i;
    card.style.alignSelf = 'center';
    card.style.justifySelf = 'center';
    card.style.height = '267px';
    card.style.width = '171px';
    card.style.margin = '1em';
    card.style.textAlign = 'center';
    card.style.display = 'flex';
    card.style.flexWrap = 'nowrap';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';
    card.style.backgroundColor = 'lightblue';
    const issue = document.createElement('div');
    issue.style.display = 'block';
    issue.style.fontWeight = 'bolder';
    issue.style.margin = '1em';
    cardsSetRegStyleToEl(issue);
    issue.classList.add('issues');
    issue.id = 'issue' + i;
    issue.textContent = q.issue;
    const answer = document.createElement('div');
    answer.style.display = 'block';
    cardsSetRegStyleToEl(answer);
    answer.classList.add('answers');
    answer.id = 'answer' + i;
    answer.textContent = q.answer;
    card.appendChild(issue);
    card.appendChild(answer);
    issues.appendChild(card);
  }
  container.appendChild(issues);
  mainDiv.appendChild(container);
  // const main = document.querySelector('#main');
  // main.innerHtml = 'ertery';
  // main.appendChild(container);
  console.log('cardsInit end');
}
function cardsSetRegStyleToEl(el) {
  el.style.fontWeight = 'normal';
  el.style.fontSize = '1.5em';
  el.style.color = 'black';
}
function cardsSetAskStyleToEl(el) {
  el.style.fontWeight = 'bolder';
  el.style.fontSize = '2em';
  el.style.color = 'green';
  el.classList.remove('muted');
}
function cardsGetQuestionId() {
  const notAnsw = currIssueData.cards.filter(
    (item) => !item.answered && !item.showing,
  );
  if (notAnsw.length > 0) {
    return notAnsw[Math.floor(Math.random() * notAnsw.length)].id;
  } else {
    return null;
  }
}
function cardsLoadJSON(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      return jsonData; // Parsed JSON data as a JavaScript object
    })
    .catch((error) => {
      console.error('Error loading JSON:', error);
    });
}

// Example usage:
// const jsonUrl = 'https://example.com/data.json'; // Replace with your JSON file URL
// loadJSON(jsonUrl).then((data) => {
//   console.log('JSON Data:', data);
//   // Use the parsed JSON data here
// });
