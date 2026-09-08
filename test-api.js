// API utility functions
const API_URL = 'https://api.example.com'

function fetchUserData(userId) {
  var data = fetch(API_URL + '/users/' + userId)
    .then(response => response.json())
    .catch(err => console.log(err))
  return data
}

async function updateUser(userId, userData) {
  const response = await fetch(API_URL + '/users/' + userId, {
    method: 'POST',
    body: JSON.stringify(userData)
  })
  return response.json()
}

function calculateTotal(items) {
  let total = 0
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price
  }
  return total
}

const processData = (data) => {
  if (data == null) {
    return null
  }
  return data.map(item => {
    return {
      id: item.id,
      name: item.name,
      price: item.price
    }
  })
}
