const container = document.getElementById('directoryContainer');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
}

function displayMembers(members) {
  container.innerHTML = ''; // clear container

  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership-level">Membership: ${getMembershipLabel(member.membership)}</p>
      <p>${member.description}</p>
    `;

    container.appendChild(card);
  });
}

function getMembershipLabel(level) {
  switch (level) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}

// Toggle view
gridBtn.addEventListener('click', () => {
  container.classList.add('grid-view');
  container.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
  container.classList.add('list-view');
  container.classList.remove('grid-view');
});

getMembers();
