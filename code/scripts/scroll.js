//variables for storing the top of the sections statically on page load
var section_top = new Array();
var scrollPosition;
var current_section = 0, new_section = 0;
var menuItems;

//attach event handlers to right and left arrow keys for 'body'
//move menus to right and left on keydown
function menuMove(event) {
  if (window.event.keyCode == 37 /*left key*/
    || (window.event.keyCode == 32 && window.event.shiftKey) /*shift+spacebar*/) {
    if (current_section > 0) {
      current_section--;
      $('#menu' + current_section)[0].click();
    }
  } else if (window.event.keyCode == 39 /*left key*/
  || (window.event.keyCode == 32 && !window.event.shiftKey) /*spacebar*/) {
    if (current_section < menuItems.length - 1) {
      current_section++;
      $('#menu' + current_section)[0].click();
    }
  }
}

//event handler for scroll attached to 'body'
//change the selected menu depending on the scroll height
function menuSelect() {
  let sectionSelected = false;
  scrollPosition = $(document).scrollTop();

	menuItems.each(function(index, value){
		if (scrollPosition <= section_top[index] - 100) {
		console.log(scrollPosition);
		console.log(section_top[index]);
		new_section = index - 1;
		sectionSelected = true;
		return false;
		}
	});
	if(!sectionSelected) {
	new_section = menuItems.length - 1;
	}

  if (new_section != current_section) {
    $("#menu" + current_section).removeClass("menuSelected");
    $("#menu" + new_section).addClass("menuSelected");
    current_section = new_section;
  }
}

//compute the tops of various divs
function computeTops() {

	menuItems = $(".menuItem").not(".unselectable");

	menuItems.each(function(index,value){
		section_top[index]=$($(this).attr('href')).offset().top;
	});
	menuSelect();
}

$(document).ready(function() {
  //add scroll animation to the internal links in the menubar
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    $target = $(this.hash);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 200, 'swing', function() {
      window.location = '#' + $target.attr('id');
    });
  });

  computeTops();
  window.addEventListener('resize', computeTops);
  window.addEventListener('orientationchange', computeTops);
  window.addEventListener('scroll', menuSelect);
  $('body').on('keydown', menuMove);
});
