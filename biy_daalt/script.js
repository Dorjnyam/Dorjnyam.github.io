document.addEventListener('DOMContentLoaded', async () => {
  // const API_BASE_URL = 'http://192.168.15.107:3000/users';
  const API_BASE_URL = 'http://10.3.203.32:3000/users';
  const navbarContainer = document.getElementById('navbar');

  let desktopMenuToggle, leftSidebar ,menuToggle, desktopMenu, logoutDesktop,desktopProfilePicture, desktopUserName,logoutSidebar,profilePicture,userName, walletBalance;

  const token = localStorage.getItem('token');
  console.log(logoutSidebar);

  function checkToken() {
    const token = localStorage.getItem('token');
    console.log('Checking token:', token);
    if (!token) {
      alert('You are not logged in. Redirecting to login page.');
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }
  
  try {
    console.log('Fetching navbar HTML...');
    const response = await fetch('navbar.html');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;
    console.log('Navbar HTML loaded successfully.');
    logoutDesktop = document.getElementById('logoutLinkDesktop');
    logoutSidebar = document.getElementById('logoutLinkSidebar');
  
    desktopMenuToggle = document.getElementById('desktopMenuToggle');
    desktopMenu = document.getElementById('desktopMenu');
    desktopProfilePicture = document.getElementById('desktopProfilePicture');
    desktopUserName = document.getElementById('desktopUserName');
    menuToggle = document.getElementById('menuToggle');
    leftSidebar = document.getElementById('leftSidebar');
    profilePicture = document.getElementById('profilePicture');
    userName = document.getElementById('userName');
    profilePicture = document.getElementById('profilePicture'); 
    logoutSidebar = document.getElementById('logoutLinkSidebar'); 
    walletBalance = document.getElementById('walletBalance'); 
    
    const logoutHandler = (event) => {
      event.preventDefault();
      localStorage.removeItem('token');
      alert('You have been logged out.');
      window.location.href = 'login.html';
    };

    if(token && (window.location.pathname == '/biy_daalt/home.html' || window.location.pathname == '/biy_daalt/dashboard.html'))
    {
      await fetchWalletBalance();
      await fetchTransactions();
      console.log("in the home")
    }
    if(token && window.location.pathname == '/biy_daalt/transaction.html')
    {
      console.log("in the transactions")
      await fetchTransactionCards();
    }
    
    if (token && (window.location.pathname === '/biy_daalt/card.html' || window.location.pathname === '/biy_daalt/wallet.html')) {
      await fetchCards();
      console.log("in the cards")
    }
    
    if (logoutDesktop) {
      logoutDesktop.addEventListener('click', logoutHandler);
    } else {
      console.error('Desktop logout link not found.');
    }
    
    if (logoutSidebar) {
      logoutSidebar.addEventListener('click', logoutHandler);
    } else {
      console.error('Sidebar logout link not found.');
    }

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
    if (!checkToken()) return;
    console.log(token)
  
    try {
      const response = await fetch(`${API_BASE_URL}/token/profile`, {
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

  async function fetchWalletBalance() {
    if (!checkToken()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/token/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wallet balance');
      }

      const data = await response.json();
      console.log('Wallet balance:', data.money);

      const walletBalanceElement = walletBalance
    if (walletBalanceElement) {
      walletBalanceElement.textContent = `$${data.money}`;
    } else {
      console.error('Element with ID "walletBalance" not found.');
    }
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
  }
  }

  async function fetchTransactions() {
    if (!checkToken()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/transaction/log`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      console.log('Transactions:', data);

      const transactionList = document.getElementById('transactionList');
      data.transactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.classList.add('flex', 'justify-between', 'text-lg');
        const transactionAmount = transaction.type === 'debit' ? 
          `<span class="text-red-500">- $${transaction.amount}</span>` : 
          `<span class="text-green-500">+ $${transaction.amount}</span>`;

        transactionItem.innerHTML = `
          <span>${transaction.description}</span>
          ${transactionAmount}
        `;
        transactionList.appendChild(transactionItem);
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
  
  async function fetchTransactionCards() {
    if (!checkToken()) return;
  
    try {
      const response = await fetch(`${API_BASE_URL}/transaction/log`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
  
      const data = await response.json();
      console.log('Transactions:', data);
  
      const transactionLogContainer = document.getElementById('transactionLog');
      transactionLogContainer.innerHTML = '';  
  
      data.transactions.forEach(transaction => {
        const transactionCard = document.createElement('div');
        transactionCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'mb-4', 'flex', 'items-center', 'space-x-4');
        
        
        const avatar = document.createElement('img');
        avatar.src = transaction.photo_url || 'default-avatar.png';  
        avatar.alt = 'Transaction Avatar';
        avatar.classList.add('w-12', 'h-12', 'rounded-full');
  
        
        const transactionDetails = document.createElement('div');
        transactionDetails.classList.add('flex-1');
        
        const transactionId = document.createElement('p');
        transactionId.classList.add('font-semibold', 'text-gray-800');
        transactionId.textContent = `ID: ${transaction.id}`;
        
        const description = document.createElement('p');
        description.classList.add('text-gray-600', 'mt-2');
        description.textContent = `Description: ${transaction.description}`;
        
        const amount = document.createElement('p');
        amount.classList.add(transaction.type === 'debit' ? 'text-red-500' : 'text-green-500', 'mt-2');
        amount.textContent = `Amount: $${transaction.amount}`;
  
        const timestamp = document.createElement('p');
        timestamp.classList.add('text-gray-400', 'mt-2');
        timestamp.textContent = `Date: ${new Date(transaction.timestamp).toLocaleString()}`;
  
        
        transactionDetails.appendChild(transactionId);
        transactionDetails.appendChild(description);
        transactionDetails.appendChild(amount);
        transactionDetails.appendChild(timestamp);
  
        
        transactionCard.appendChild(avatar);
        transactionCard.appendChild(transactionDetails);
  
        
        transactionLogContainer.appendChild(transactionCard);
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }
  

async function fetchUserData(pictureElement, nameElement) {
  if (!checkToken()) return;
  console.log('Fetching user data...');
  if (!token) {
    console.error('No authentication token available');
    return;
  }
  try {
    console.log('Making API request for user data...');
    const response = await fetch(`${API_BASE_URL}/token/profile`, {
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
  
    const response = await fetch(`${API_BASE_URL}/register`, {
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
  
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const result = await response.json();
  
    if (!response.ok) {
      document.getElementById('formError').textContent = result.message || 'Invalid login credentials.';
    }

    if (result.token) {
      localStorage.setItem('token', result.token);
      window.location.href = 'profile.html';
    } else {
      console.log("---------------",result.message);
    }
  });

  
  if (window.location.pathname === '/biy_daalt/profile.html') {
    if (!checkToken()) return;
    if (!token) {
      console.log("No token found. Redirecting to login page.");
      return window.location.href = 'login.html';
    }
    console.log("Token found, fetching profile data...");
  
    try {
      const response = await fetch(`${API_BASE_URL}/token/profile`, {
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
    if (!checkToken()) return;
    const cardData = {
      card_number: document.getElementById('card_number').value,
      card_holder_name: document.getElementById('card_holder_name').value,
      expiry_date: document.getElementById('expiry_date').value,
      cvv: document.getElementById('cvv').value,
      zip: document.getElementById('zip').value,
    };
    if (!checkToken()) return;
    const response = await fetch(`${API_BASE_URL}/card/add-card`, {
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

  
  async function fetchCards() {
    const token = localStorage.getItem('token');
    if (!token) {
        return window.location.href = 'login.html';
    } else {
        console.log(token);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/card/cards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cards');
        }

        const result = await response.json();
        console.log("--------", result);

        const cardList = document.getElementById('cardList');
        if (!cardList) {
            console.error('Card list element not found!');
            return;
        }

        let selectedCard = null;  // Track the selected card

        result.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            
            // Get random background color for the card
            function getRandomColor() {
                const colors = ['bg-blue-200', 'bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-purple-200', 'bg-teal-200'];
                const randomIndex = Math.floor(Math.random() * colors.length);
                return colors[randomIndex];
            }

            cardElement.innerHTML = `
                <div class="max-w-sm rounded-lg overflow-hidden shadow-lg ${getRandomColor()} p-6 mb-4 cursor-pointer">
                    <div class="text-center">
                        <h3 class="text-lg font-semibold text-gray-800">${card.card_holder_name}</h3>
                        <p class="text-gray-600">Expiry Date: ${card.expiry_date}</p>
                        <p class="text-gray-600">ZIP: ${card.zip}</p>
                    </div>
                </div>
            `;

            // Add event listener to toggle selection when clicked
            cardElement.addEventListener('click', () => {
                if (selectedCard === card) {
                    // Deselect the card if it's already selected
                    selectedCard = null;
                    cardElement.classList.remove('border-4', 'border-blue-500'); // Remove border to deselect
                    console.log('Card deselected');
                } else {
                    // Select the card if it's not already selected
                    selectedCard = card;
                    // Highlight the selected card (for example, by adding a border)
                    const allCards = document.querySelectorAll('.card');
                    allCards.forEach(c => c.classList.remove('border-4', 'border-blue-500')); // Remove highlight from all cards
                    cardElement.classList.add('border-4', 'border-blue-500'); // Add border to selected card
                    console.log('Selected card:', selectedCard);
                }
            });

            cardList.appendChild(cardElement);
        });

        // Handle form submission for top-up
        const walletForm = document.getElementById('walletForm');
        walletForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!selectedCard) {
                alert('Please select a card to deposit into');
                return;
            }

            const amount = parseFloat(document.getElementById('amount').value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            console.log(amount)

            try {
                const response = await fetch(`${API_BASE_URL}/card/deposit`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: amount,
                    }),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Top-Up successful!');
                    // Optionally, update UI or clear the form
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error during top-up:', error);
                alert('An error occurred during the top-up');
            }
        });

    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}


});
