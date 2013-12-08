$(document).ready(function(){

	console.log('bdfh');

	$("#slider ul > li:gt(0)").hide(); // Dölj alla list objekt förutom den första

	var slider_speed 	= 4000; 	// Antal millisekunder som används av funktioner timer()
	var fade_speed 		= 1000; 	// Antal millisekunder slides tonas ut på
	var hovering 		= false; 	// Om man hovrar över slidern kommer denna sättas till true
	var clicking 		= false; 	//
	var amount_images 	= $('#slider ul li').length; // Antal objekt som ska slidea
	var i = 1;

	function show_slide() { // Funktion för att visa slide
		$('#list-' + i)
			.removeClass('absolute') // Tar bort klassen .absolute från objektet, dvs inte längre position:absolute
	        .show(); // Visa objektet
	}

	function fade_out_slide() { // Funktion för att dölja slide
		$('#list-' + i)
			.addClass('absolute') // Lägger till klassen .absolute till objektet, dvs nu är den position:absolute
			.fadeOut(fade_speed); // Fadea ut objektet i antalet angivna millisekunder
	}

	function next_slide() {
		if( i === amount_images ) { // Om listobjektet är det sista, visa det första
			console.log('banan');
			fade_out_slide();
			i = 1;
			show_slide();
		} else {
			fade_out_slide();
			i++;
			show_slide();
		}
	}

	function prev_slide() {
		if( i === 1 ) { // Om listobjektet är det första, visa det sista
			fade_out_slide();
			i = amount_images;
			show_slide();
		} else {
			console.log('päron');
			fade_out_slide();
			i--;
			show_slide();
		}
	}

	$('#prev, #next').click(function(){ // Vid klick på föregående och nästa-knapparna
		if( clicking === false ) { // Om senaste klick var minst lika många millisekunder sen, som fade_speed är satt till
			if( $(this).attr('id') == 'prev') { // Om klick på var på föregående-knappen
				prev_slide();
			} else { // Om klick var på nästa-knappen
				next_slide();
			}

			clicking = true; // Du har klickat

			setTimeout(function() { // Startar en timer, när denna har kört så kommer det gå att klicka på knapparna igen
				clicking = false; // Klick återställs, du kan nu klicka igen
			}, fade_speed);
		}
	});

	$('#slider').hover(function(){ // Vid hover över slidern
        hovering = true;
    },function(){ // När man slutar hovra över slidern
        hovering = false;
    });

	function timer() {
		setTimeout(function() {
			if( hovering === false) { // Kör om man hovrar över slidern
				next_slide(); // Nästa slide
			}
			timer(); // Kör sig själv igen!
		}, slider_speed); // Allt i setTimeout funktionen körs först efter antalet angivna millisekunder
	}

	timer(); // Startar funktionen timer(), den kommer sedan starta om sig själv efter antal angivna millisekunder

// End of jQuery
});