const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const foxApiUrl = 'https://randomfox.ca/floof/';
const resultsContainer = document.querySelector('#results-container');
const searchInput = document.querySelector('#search-input');
const colorFilterSelect = document.querySelector('#color-filter-select');

async function getUsers() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getRandomFox() {
  try {
    const response = await fetch(foxApiUrl);
    const data = await response.json();
    return data.image;
  } catch (error) {
    console.error('Error:', error);
  }
}

function renderUsers(users) {
  resultsContainer.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const phoneCell = document.createElement('td');

    nameCell.textContent = user.name;
    emailCell.textContent = user.email;
    phoneCell.textContent = user.phone;

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);

    resultsContainer.appendChild(row);
  });
}

async function init() {
  const users = await getUsers();
  renderUsers(users);
}

function handleSearch() {
  const searchQuery = searchInput.value;
  const filteredResults = users.filter(result => {
    return result.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  renderUsers(filteredResults);
}

function handleColorFilter() {
  const selectedColor = colorFilterSelect.value;
  const filteredResults = users.filter(result => {
    return result.company.name.toLowerCase().includes(selectedColor.toLowerCase());
  });
  renderUsers(filteredResults);
}

async function handleNewImage() {
  const newImage = await getRandomFox();
  document.querySelector('#fox-image').src = newImage;
}

searchInput.addEventListener('input', handleSearch);
colorFilterSelect.addEventListener('change', handleColorFilter);
document.querySelector('#new-image-btn').addEventListener('click', handleNewImage);

init();

const apiUrl = 'https://randomfox.ca/floof/';

const newImageBtn = document.getElementById('new-image-btn');
newImageBtn.addEventListener('click', () => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const image = document.createElement('img');
      image.src = data.image;
      document.body.appendChild(image);
    })
    .catch(error => console.error(error));
});