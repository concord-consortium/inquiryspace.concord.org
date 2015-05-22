// initialize vars
var category, rotate_timer;
var deferred_obj = $.Deferred();

$(document).ready(function() {

  // show CC info on CC logo click
  $('#cc-logo').bind('click', showCC);

  // set up navigation link behaviors
  setupNavLinks();

  // start shake animations for certain page elements
  var shake_scroll = setInterval(periodicalScroll, 6000);
  
});

function setupNavLinks(){
  $('#brand a:first').click(function(){
    navTo('content');
	return false;
  });
  $('#brand nav li a').each(function() {
    $(this).click(function(){
		var link_target = $(this).attr('href').replace(/^#/, '');
		navTo(link_target);
		return false;
	});
  });
}

// special scrolling behaviors
$window = $(window);
$('section[data-type="background"]').each(function(){
        var $bgobj = $(this);
        $(window).scroll(function() {
            var yPos = -(($window.scrollTop() - $bgobj.offset().top)/$bgobj.data('speed'));
            var coords = 'left '+ yPos + 'px';
            $bgobj.css({backgroundPosition: coords});
		});
});

$(window).scroll(function() {
  if ($('html body').scrollTop() >= 75) {
    shrinkHeader();
  } else if ($('html body').scrollTop() == 0) {
    expandHeader();
  }
  if ($(window).scrollTop() >= $('#get-started').position().top && $(window).scrollTop() < $('#activities').position().top) {
    //updateHash('#get-started');
    setSelectedNavLink('#get-started');
  } else if ($(window).scrollTop() >= $('#activities').position().top && $(window).scrollTop() < $('#research').position().top) {
    //updateHash('#activities');
    setSelectedNavLink('#activities');
  } else if ($(window).scrollTop() >= $('#research').position().top && $(window).scrollTop() < $('#contact').position().top) {
    //updateHash('#research');
    setSelectedNavLink('#research');
 } else if ($(window).scrollTop() >= $('#contact').position().top - 100) {
    //updateHash('#contact');
    setSelectedNavLink('#contact');
  } else {
    setSelectedNavLink('#intro');
    //updateHash('');
  }
});

function hideVideo() {
	$('#video').fadeOut(500);
	$('#video-list li').hide('slide', { direction: 'right' }, 500);
	$('#about p').fadeOut(500);
}

function showVideo(){
	$('#video').show('slide', { direction: 'up' }, 1000);
	$('#video-list li').show('slide', { direction: 'left' }, 1000);
	$('#about p').fadeIn(1500);
}

function setSelectedNavLink(section) {
	$('nav li a').each(function() {
		$(this).removeClass('current');
	});
	if (section != '') {
		var section_link = section + '-link';
		$(section_link).addClass('current');
	}
}

function showCC() {
  $('#brand').animate({backgroundColor: '#f9eec1', 'top': 340}, 700);
  $('#overlay').css({'opacity': .5}).fadeIn(0).animate({'top': 340}, 700);
  $('#content').animate({'margin-top': '340'}, 700);
  $('#cc').animate({'top': 0}, 700);
  $('#cc-logo').unbind('click').bind('click', hideCC);
}

function hideCC() {
  $('#brand').animate({backgroundColor: '#bddfdf', 'top': 0}, 700);
  $('#overlay').fadeOut('fast').animate({'top': 0}, 700);
  $('#content').animate({'margin-top': '0'}, 700);
  $('#cc').animate({'top': -340}, 700);
  $('#cc-logo').unbind('click').bind('click', showCC);
}

function navTo(elem) {
	var link_id = '#' + elem + '-link';
	if (elem == 'intro') {
		$('html, body').animate({scrollTop: 0}, 500);
	} else {
		$('html, body').animate({scrollTop: $('#' + elem).offset().top - 50}, 500);
	}
}

function shrinkHeader() {
	$('#brand, #brand section').stop().animate({'height': '75px'}, 150);
	$('#cc-logo').stop().animate({'height': '50px', 'margin-top': '-26px', 'width': '141px'}, 100);
}

function expandHeader() {
	$('#brand, #brand section').stop().animate({'height': '100px'}, 150);
	$('#cc-logo').stop().animate({'height': '65px', 'margin-top': '-32px', 'width': '183px'}, 100);
}

function periodicalScroll() {
	$('#scroll').effect('shake', { direction: 'up', distance: 10, times: 3 }, 700);
}

function updateHash(hash) {
  hash = hash.replace(/^#/, '');
  var div_pos_type;
  var div_top = $(document).scrollTop() + 'px';
  var fx, node = $('#' + hash);
  if (node.length) {
    node.attr('id', '');
    if (navigator.appName.indexOf('Microsoft Internet Explorer') != -1) {
      div_pos_type = 'fixed';
    } else {
      div_pos_type = 'absolute';
    }
    fx = $('<div style="height: 50000px;"></div>')
            .css({
                position: div_pos_type,
                visibility: 'hidden',
                top: div_top
            })
            .attr('id', hash)
            .appendTo(document.body);
  }
  document.location.hash = hash;
  if (node.length) {
    fx.remove();
    node.attr('id', hash);
  }
}

function changeHashNoScroll(hash) {
	var scrollmem = $('html').scrollTop();
	window.location.hash = hash;
	$('html,body').scrollTop(scrollmem); // unnecessary?
}