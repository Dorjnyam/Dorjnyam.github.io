document.addEventListener('DOMContentLoaded', async () => {
  const navbarContainer = document.getElementById('navbar');
  let desktopMenuToggle, leftSidebar ,menuToggle, desktopMenu, desktopProfilePicture, desktopUserName,profilePicture,userName;
  
  try {
    console.log('Fetching navbar HTML...');
    const response = await fetch('navbar.html');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;
    console.log('Navbar HTML loaded successfully.');
  
    desktopMenuToggle = document.getElementById('desktopMenuToggle');
    desktopMenu = document.getElementById('desktopMenu');
    desktopProfilePicture = document.getElementById('desktopProfilePicture');
    desktopUserName = document.getElementById('desktopUserName');
    menuToggle = document.getElementById('menuToggle');
    leftSidebar = document.getElementById('leftSidebar');
    profilePicture = document.getElementById('profilePicture');
    userName = document.getElementById('userName');
    profilePicture = document.getElementById('profilePicture');  
    
    if (desktopMenuToggle && desktopMenu) {
      desktopMenuToggle.addEventListener('click', async () => {
        desktopMenu.classList.toggle('hidden');
        if (!desktopProfilePicture.src) {
          await fetchUserData(desktopProfilePicture, desktopUserName);
        }
      });
    } else {
      console.log('Desktop menu toggle or menu not found.');
    }
  
  } catch (error) {
    console.error('Error fetching navbar:', error);
  }
  
  if (menuToggle && leftSidebar) {
    console.log('Menu toggle found. Adding click event listener.');
    menuToggle.addEventListener('click', async () => {
      console.log('Menu toggle clicked.');
      leftSidebar.classList.toggle('-translate-x-full');
      if (!leftSidebar.classList.contains('-translate-x-full')) {
        console.log('Sidebar opened, fetching user data...');
        await fetchUserData(profilePicture, userName);
      }
    });
  }

  async function fetchUserData(pictureElement, nameElement) {
    
    const token = 'your-authentication-token-here';
  
    try {
      const response = await fetch('http://192.168.15.107:3000/users/token/profile', {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
      console.log("hiiiiiiiiiiii",userData)
  
      if (userData.profilePicture) {
        pictureElement.src = userData.profilePicture;
        pictureElement.classList.remove('hidden');
      }
  
      if (userData.name) {
        nameElement.textContent = userData.username;
        nameElement.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
async function fetchUserData(pictureElement, nameElement, token) {
  console.log('Fetching user data...');
  if (!token) {
    console.error('No authentication token available');
    return;
  }
  try {
    console.log('Making API request for user data...');
    const response = await fetch('http://192.168.15.107:3000/users/token/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    } 

    const userData = await response.json();
    console.log('User data received:', userData);

    if (userData.profilePicture) {
      console.log('Setting profile picture...');
      pictureElement.src = userData.profilePicture;
      pictureElement.classList.remove('hidden');
    }

    if (userData.username) {
      console.log('Setting user name...');
      nameElement.textContent = userData.username;
      nameElement.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}


  
  document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
  
    const result = await response.json();
    alert(result.message);
  });

  
  document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://192.168.15.107:3000/users/login', {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const result = await response.json();
  
    if (result.token) {
      localStorage.setItem('token', result.token);
      window.location.href = 'profile.html';
    } else {
      alert(result.message);
    }
  });

  
  if (window.location.pathname === '/biy_daalt/profile.html') {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No token found. Redirecting to login page.");
      return window.location.href = 'login.html';
    }
    console.log("Token found, fetching profile data...");
  
    try {
      const response = await fetch('http://192.168.15.107:3000/users/token/profile', {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.log("Failed to fetch profile data. Status:", response.status);
        return;
      }
  
      const result = await response.json();
      console.log("Profile data fetched successfully:", result);
  
      document.getElementById('profileInfo').innerHTML = `  
  <img src="${result.photo_url}" alt="Profile Photo" class="rounded-full w-24 h-24 mb-4" />
  <p class="text-lg font-semibold text-gray-800">Username: ${result.username}</p>
  <p class="text-sm text-gray-600">Email: ${result.email}</p>
  <p class="text-sm text-gray-600">First Name: ${result.first_name}</p>
  <p class="text-sm text-gray-600">Last Name: ${result.last_name}</p>
`;

    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  }

  
  document.getElementById('addCardForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const cardData = {
      card_number: document.getElementById('card_number').value,
      card_holder_name: document.getElementById('card_holder_name').value,
      expiry_date: document.getElementById('expiry_date').value,
      cvv: document.getElementById('cvv').value,
      zip: document.getElementById('zip').value,
    };
  
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/card/add-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(cardData),
    });
  
    const result = await response.json();
    alert(result.message);
  });

  
  if (window.location.pathname === '/card.html') {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = 'login.html';
  
    const response = await fetch('http://localhost:3000/card/cards', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const result = await response.json();
    const cardList = document.getElementById('cardList');
    result.cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.innerHTML = `
        <p>Card Holder: ${card.card_holder_name}</p>
        <p>Expiry Date: ${card.expiry_date}</p>
        <p>ZIP: ${card.zip}</p>
      `;
      cardList.appendChild(cardElement);
    });
  }
});
