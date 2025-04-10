const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      menu.classList.toggle('active');
    });
    //when the hamburger button was active which means in below 768px screen size, the menu will be shown and gets the active class for both hamburger button and menu
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = menu.contains(event.target) || hamburger.contains(event.target);
      
      if (!isClickInside && menu.classList.contains('active')) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
//when other parts of the screen are clicked, the menu will be closed and the active class was removed from both hamburger and menu
    
document.querySelector('.sidebar').addEventListener('click', function() {
  document.querySelector('.side-drawer').classList.toggle('active');
});