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

// function to open wishlist modal
function openWishlistModal() {
    wishlistModal.style.display = 'flex';
}

// function to close wishlist modal
function closeWishlistModal() {
    wishlistModal.style.display = 'none';
}

// event listeners to open and close wishlist modal
openWishlistModalBtn.addEventListener('click', openWishlistModal);
closeWishlistModalBtn.addEventListener('click', closeWishlistModal);
