// Get references to elements
const bookingDateInput = document.getElementById('bookingDate');
const bookingTimeSelect = document.getElementById('bookingTime');
const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.seat');
const countDisplay = document.getElementById('count');
const totalDisplay = document.getElementById('total');
const confirmButton = document.getElementById('confirmButton');
const bookedSeatsList = document.getElementById('bookedSeatsList');
const bookedSeatsDisplay = document.getElementById('bookedSeatsDisplay');
const thanksMessage = document.getElementById('thanksMessage');
const bookingDateDisplay = document.getElementById('bookingDateDisplay');
const bookingTimeDisplay = document.getElementById('bookingTimeDisplay');
const amountPaidDisplay = document.getElementById('amountPaid');

// Movie price and selection
let moviePrice = parseInt(movieSelect.value);

// Initialize seat selection state
let selectedSeats = [];

// Update seat selection
function updateSeatSelection() {
    let seatCount = selectedSeats.length;
    let totalAmount = seatCount * moviePrice;
    countDisplay.textContent = seatCount;
    totalDisplay.textContent = totalAmount;
    confirmButton.disabled = seatCount === 0;
}

// Handle seat selection
seats.forEach((seat, index) => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('sold')) {
            seat.classList.toggle('selected');
            if (seat.classList.contains('selected')) {
                selectedSeats.push(index);
            } else {
                selectedSeats = selectedSeats.filter(seatIndex => seatIndex !== index);
            }
            updateSeatSelection();
        }
    });
});

// Handle movie selection change
movieSelect.addEventListener('change', () => {
    moviePrice = parseInt(movieSelect.value);
    updateSeatSelection();
});

// Handle date selection
bookingDateInput.addEventListener('change', () => {
    if (bookingDateInput.value) {
        document.querySelector('.time-selection').style.display = 'block';
    } else {
        document.querySelector('.time-selection').style.display = 'none';
    }
});

// Handle time selection
bookingTimeSelect.addEventListener('change', () => {
    if (bookingTimeSelect.value) {
        document.querySelector('.movie-container').style.display = 'block';
    }
});

// Handle seat selection and confirmation
confirmButton.addEventListener('click', () => {
    // Display booked seats
    bookedSeatsList.textContent = selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats booked yet.';
    bookedSeatsDisplay.style.display = 'block';
    thanksMessage.style.display = 'block';

    // Display booking date and time
    const currentDate = new Date();
    bookingDateDisplay.textContent = bookingDateInput.value;
    bookingTimeDisplay.textContent = bookingTimeSelect.value;
    amountPaidDisplay.textContent = totalDisplay.textContent;

    // Hide the seat selection and confirmation button
    document.querySelector('.container').style.display = 'none';
    confirmButton.disabled = true;
});