// variables
const items =[];
const welcomeMessage = document.getElementById('welcomeMessage');
const addBtn = document.getElementById('addBtn');

// event listeners

// window.addEventListener('load', (event) => {
//     console.log('page is fully loaded');
//     if (items.length !== 0) {
//         welcomeMessage.classList.add('visibleOff');
//     }
// });

addBtn.addEventListener('click', () => {
    welcomeMessage.classList.add('visibleOff');
})

// display the welcome message
if (items.length !== 0) {
    welcomeMessage.classList.add('visibleOff');
    // console.log('at least 1 item in list present');
}
