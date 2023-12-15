var contactModal = document.getElementById('contactModal');
var openContactModalBtn = document.getElementById('contactBtn');
var closeContactModalBtn = document.getElementById('closeContact');

// function to open contact modal
function openContactModal() {
    contactModal.style.display = 'flex';
}

// function to close contact modal
function closeContactModal() {
    contactModal.style.display = 'none';
}

// event listeners to open and close contact modal
openContactModalBtn.addEventListener('click', openContactModal);
closeContactModalBtn.addEventListener('click', closeContactModal);

var wishlistModal = document.getElementById('wishlistModal');
var openWishlistModalBtn = document.getElementById('wishlistBtn');
var closeWishlistModalBtn = document.getElementById('closeWishlist');


// Function to open the wishlist modal
function openWishlistModal() {
    $('#wishlistModal').addClass('is-active');
  }

// Function to close the wishlist modal
function closeWishlistModal() {
    $('#wishlistModal').removeClass('is-active');
  }

function closeGamesModal () {
  $('#games-modal').removeClass('is-active');
}