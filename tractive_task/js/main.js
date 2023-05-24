
createPagination();
var  paginationItems = Array.from(document.querySelectorAll('.pagination span'));
const slider = document.querySelector('.products-slider');


// Create Pagination 
function createPagination(){
  let totalpag = 6;
  let toalItemes = document.querySelectorAll(".item-box").length;

  if(window.innerWidth<768){
    totalpag = toalItemes-2
  }else if(window.innerWidth <1200){
    totalpag = toalItemes-3
  }else{
    totalpag = toalItemes-4
  }

  let paginationHtml = '';
  for(let i=0; i<=totalpag; i++){
    if(i==0){
      paginationHtml +='<span class="active"></span>';
    }else{
      paginationHtml += ' <span></span>';
    }
  }
  document.querySelector('.pagination').innerHTML = paginationHtml;
}


// Calculate initial item width
let itemWidth = document.querySelector('.item-box').offsetWidth + 40; // Include margin


// Set initial scroll position and dragging state
let scrollPosition = 0;
let isDragging = false;

// Update pagination on scroll
function updatePagination() {
  const currentIndex = Math.floor(scrollPosition / itemWidth);
  paginationItems.forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
  });
}

// Handle mouse and touch events for dragging
function handleDragStart(event) {
  isDragging = true;
  startX = event.pageX || event.touches[0].pageX;
  scrollPosition = slider.scrollLeft;
  slider.style.scrollBehavior = 'unset';
}

function handleDragMove(event) {
  if (!isDragging) return;
  const currentX = event.pageX || event.touches[0].pageX;
  const scroll = (currentX - startX) * 1.5;
  slider.scrollLeft = scrollPosition - scroll;
}

function handleDragEnd() {
  isDragging = false;
  slider.style.scrollBehavior = 'smooth';
  updatePagination();
}

// Add event listeners for dragging
slider.addEventListener('mousedown', handleDragStart);
slider.addEventListener('mousemove', handleDragMove);
slider.addEventListener('mouseup', handleDragEnd);
slider.addEventListener('mouseleave', handleDragEnd);

slider.addEventListener('touchstart', handleDragStart);
slider.addEventListener('touchmove', handleDragMove);
slider.addEventListener('touchend', handleDragEnd);

// Handle pagination click events
function addpageinatinEvent(){
paginationItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    scrollPosition = index * itemWidth;
    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
    updatePagination();
  });
});
}
addpageinatinEvent();

// Update item width on window resize
window.addEventListener('resize', () => {

  itemWidth = document.querySelector('.item-box').offsetWidth + 40;
  createPagination();
  paginationItems = Array.from(document.querySelectorAll('.pagination span'));
  addpageinatinEvent(); 
  updatePagination();
});
