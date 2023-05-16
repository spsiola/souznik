function testCard(url) {
  console.log('testCard url=', url);
}
function loadJSON(url) {
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
