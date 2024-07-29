window.addEventListener("DOMContentLoaded", function () {
  let productsCount = document.getElementById("productsCount");
  let usersCount = document.getElementById("usersCount");
  let OrdersCount = document.getElementById("OrdersCount");
  let reviewsCount = document.getElementById("reviewsCount");
  let offersCount = document.getElementById("offersCount");
  // add all Product to localstorage
  try {
    fetch("../../json_data/Products.json")
      .then((respones) => respones.json())
      .then((Products) => {
        let stored = JSON.parse(localStorage.getItem("products"))
        !stored ? localStorage.setItem('products', JSON.stringify(Products)) : ''

      })
  } catch (error) {
    console.log("Can't fetch data ", error);

  }
  function getAllProducts() {
    let allProducts = JSON.parse(localStorage.getItem("products"))
    productsCount.innerText = allProducts.length
  }
  getAllProducts()
  // --------------------------------------
  function getAllUsers() {
    let allUsers = JSON.parse(localStorage.getItem('users'))
    usersCount.innerText = allUsers == null ? 0 : allUsers.length
  }
  getAllUsers()
  // --------------------------------------

  function getAllOrders() {
    let allOrders = JSON.parse(localStorage.getItem('orders')) || []
    OrdersCount.innerText = allOrders.length
  }
  getAllOrders()
  // --------------------------------------

  function getAllOffers() {
    let allOffers = JSON.parse(localStorage.getItem('offers')) || []
    offersCount.innerText = allOffers.length
  }
  getAllOffers()
  // --------------------------------------

  function getAllReviews() {
    let allReview = JSON.parse(localStorage.getItem('waitReview')) || []
    reviewsCount.innerText = allReview.length
  }
  getAllReviews()
  // --------------------------------------
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active");
    document.querySelector(".hide").style.display = "block"
  });
  document.querySelector(".hide").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active");
    document.querySelector(".hide").style.display = "none"
  })
})

// Charts
let getAllProducts = (JSON.parse(localStorage.getItem("products")) || []).length
let getAllUsers = (JSON.parse(localStorage.getItem('users')) || []).length
let getAllOrders = (JSON.parse(localStorage.getItem('orders')) || []).length
let getAllOffers = (JSON.parse(localStorage.getItem('offers')) || []).length
let getAllReviews = (JSON.parse(localStorage.getItem('waitReview')) || []).length
let getAllComplainies = (JSON.parse(localStorage.getItem('Emails')) || []).length
let getAllAnswers = (JSON.parse(localStorage.getItem('answers')) || []).length


const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Products', 'Users', 'Orders', 'Offers', 'Reviews', 'Complainies', 'Answers'],
    datasets: [{
      label: 'Total',
      data: [getAllProducts, getAllUsers, getAllOrders, getAllOffers, getAllReviews, getAllComplainies, getAllAnswers],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}); 
