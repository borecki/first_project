var app = angular.module("demoApp",["scrollSpyModule", "countUpModule"]);
var documentHeight = document.documentElement.clientHeight;

/* email form validator */
$("#contactForm").validate({
  errorClass: "text-error",
  rules: {
    subject: "required",
	message: "required",
    email: {
      required: true,
      email: true
    }
  },
  messages: {
    subject: "Brak&nbsp;tematu&nbsp;wiadomości",
	message: "Brak&nbsp;treści&nbsp;wiadomości",
    email: {
      required: "Brak&nbsp;adresu&nbsp;email",
      email: "Błedny&nbsp;adres&nbsp;email"
    }
  }
});

$(document).ready(function() {
	
/* smooth scroll */	  
	$(".a").on('click', function(event) {
		if(this.hash !=="") {
			event.preventDefault();
			var hash=this.hash;
			var scrollHeight = $(hash).offset().top - 65;
			$('html, body').animate({
			scrollTop: scrollHeight
			})
		}
    });

/* google map rwd */	 
	if($(window).width()<1183 && $(window).width()>480) {
		$('.google-map')
			.removeClass("embed-responsive embed-responsive-4by3")
		$('.google-map iframe')
			.removeClass("embed-responsive-item")
	}

	$(window).resize(function(){
		if($(window).width()<1183 && $(window).width()>480) {
			$('.google-map')
				.removeClass("embed-responsive embed-responsive-4by3")
			$('.google-map iframe')
				.removeClass("embed-responsive-item")
		} else {
			$('.google-map')
				.addClass("embed-responsive embed-responsive-4by3")
			$('.google-map iframe')
				.addClass("embed-responsive-item")
		}
	});

/* projects gallery */
	var $singleProject = $(".portfolio .row .col-sm-6 div");
	$.each($singleProject, function() {
		$singleProject.css({ 'opacity': '0.0' })
	});

	function animateGallery() {
		var i=0;
		var delayValue = 200;
		while(i < 8) {	
			$("#"+i).delay(delayValue).animate({
				'opacity': '1.0',
			}, "medium");
			delayValue=delayValue+250;
			i++;
		}
	};

	$(window).scroll(function(){
		if($(window).scrollTop() > 1850) {
			animateGallery();
		}
	});

/* pop up modal */
	
	$.get("features/projects_details.xml", function(data){
		var arFeeds = new Array();
		console.log(data);
		$(data).find('feed').each(function(){
			var tmp = {
				id: $(this).attr('id'),
				title: $("title", this).text(),
				img: $(this).children("img").attr('src'),
				description: $(this).children("description").text(),
				techTitle: $(this).children("techTitle").text(),
				tech: $(this).children("tech").text(),	
			}
			arFeeds.push(tmp);
		}); 
		
		function popMaker() {
			var $divContainer = $('<div></div>')
					.attr('id', 'popContainer')
					.addClass('pop-container')
					.css('opacity', 0.0);	
			var $imgCloseContainer = $('<img>')
					.attr({
						'src': 'images/close.png',
						'alt': 'close container'
					})
					.addClass('pop-close-img')
					.bind('click', popClose);
			var $divTitle = $('<div>')
					.addClass('pop-title')
					.text(arFeeds[$(this).attr("id")]['title']);
			var $divTechTitle = $('<div>')
					.addClass('techTitle')
					.html(arFeeds[$(this).attr("id")]['techTitle']); 
			var $divTech = $('<div>')
					.addClass('tech')
					.html(arFeeds[$(this).attr("id")]['tech']);	
			var $divTechnologies = $('<div>')
					.addClass('technologies')	
			var $divDescription = $('<div>')
					.addClass('pop-description')
					.text(arFeeds[$(this).attr("id")]['description']);
			var $divImgContainer = $('<div>')
					.addClass('pop-imgContainer')
			var $divImg = $('<img>')
					.attr({
						'src': (arFeeds[$(this).attr("id")]['img'])
					})
					.addClass('pop-img')
					.addClass('img-responsive');
			var $divButton = $('<button>')
					.html('<a href="#">SEE ONLINE</a>')
					.addClass('pop-button btn btn-danger')
					.css({
						'display': 'none'
						});
						
			$divImg.mouseenter(function(){
				$divButton.css({
					'display': 'block',
					});
				$divImg.css({
					'opacity': 0.5,
					})
			}) 
						
			$divImgContainer.mouseleave(function() {
				$divButton.css({
					'display': 'none',
					});
				$divImg.css({
					'opacity': 1.0
					})
			})
			
			$divImgContainer
				.append($divButton)
				.append($divImg);
				
			$divTechnologies
				.append($divTechTitle)
				.append($divTech)
			
			$divContainer
				.append($imgCloseContainer)
				.append($divTitle)
				.append($divImgContainer)
				.append($divTechnologies)
				.append($divDescription)
				.appendTo($('body'))
				.animate({
					'top': (parseInt($(document).scrollTop())+35)+"px",
					'opacity': 1.0
				}, "slow")
					.center();
					
			$(window).scroll(function(){
				$divContainer.css('top', (parseInt($(document).scrollTop())+35)+"px")
			});
				
			$(window).resize(function(){
				$divContainer.center();
			});
				
			$.fadePage({
				onclick: popClose,
				zindex: $divContainer.css('z-index')-1
			}); 
			return false;
		};

		function popClose(){
			$('#popContainer').animate({
				'top': "+=" + (parseInt($(document).height())+35)+"px",
				'opacity': 0.0
			}, "slow", function(){
				$(this)
					.unbind('click')
					.remove();
					
					$.fadePage({
						action: 'fadeout'
					});
			})
		}
		$singleProject.click("click", popMaker); 
	});

/* add + after mouseenter on one of gallery project */
	var p = document.createElement("p");
	var t = document.createTextNode("+");
	p.appendChild(t);
	p.classList.add("plus");
	p.classList.add("text-center");
		
	$('.portfolio .container-fluid .row .col-sm-6 div').mouseenter(function(){
		this.appendChild(p);
	}) 
				
	$('.portfolio .container-fluid .row .col-sm-6 div').mouseleave(function() {
		this.removeChild(p);
	})
 
/* fade menu background after scrool*/
	if($(window).scrollTop() > documentHeight-52) {
		$("nav").addClass("blackMenu")
	} else {
		$("nav").removeClass("blackMenu");
	}

	function scrollTopCheck() {
		if($(window).scrollTop() > documentHeight-52) {
			$("nav").addClass("blackMenu")
		} else {
			$("nav").removeClass("blackMenu");
		}
	}

	$(window).scroll(scrollTopCheck); 
	new WOW().init();

/* header actions RWD */
	if ( $(window).width() < 975 ) {
		$('#menu').css("display", "none");
	}

	function widthCheck() {
		if($("#menu").css('display') == 'flex') {
			$("#menu").css("display","none");
			$("header nav").animate({
					"height": "52px"
				}, "fast")
		}
		if ( $(window).width() < 975 ) {
			$('#menu').css("display", "none");
		}
		else {
			$('#menu').css("display", "flex");
		}
	}
	
	$(window).resize(widthCheck);

	$(".menu-responsive").click(function () {
		if($("#menu").css('display') == 'flex') {
			$("#menu").css("display","none");
			$("header nav").animate({
					"height": "52px"
				}, "fast")
		} else {
			$("#menu").css("display", "flex");
			$("header nav").animate({
					"height": "190px"
				}, "fast")
		}
		
		if($(window).scrollTop() == 0) {
			if($("#menu").css('display') == 'none') {
				$("h1").animate({
					"margin-top": "70px"
				}, "fast")
			} else {
				$("h1").animate({
					"margin-top": "220px"
				}, "fast")
			} 
		}
	});
	
	$("#menu a").click(function() {
		if ( $(window).width() < 975 ) {	
			$("#menu").css("display", "none");
			$("header nav").animate({
					"height": "52px"
			}, "fast")
		}
	})
	
	$("form button").click(function() {
		var data = {
   			subject: $("#subject").val(),
    		email: $("#email").val(),
    		message: $("#message").val()
		};
		$.ajax({
    		type: "POST",
    		url: "mail.php",
    		data: data,
    		success: function(){
        		alert('Twój email został wysłany.');
    		},
			error: function() {
				alert('Coś poszło nie tak!\nNie udało się wysłać wiadomości. Proszę, wyślij email przez własną skrzynkę lub wybierz inną formę kontaktu.');
			}
		});
	});

});