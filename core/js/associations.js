var timeAtStart;		//keep track of time at which the experiment start
var participant;		//will contain user id, age, gender
var filename;
var currentTrial;
var currentAssociation;
var debug = true;

$(document).ready(function(){   	
	
	//set the page scrolling
    $('#content').fullpage({
    	scrollingSpeed: 10,
        resize : false,
        easing: 'linear',
        navigation: false,
        scrollOverflow: true,
        autoScrolling: true,
        keyboardScrolling: false,
        paddingTop: '30px',
        paddingBottom: '30px',
        afterLoad: function(anchorLink, index){  
        	if (anchorLink > 0) {
        		showTrial(anchorLink);        		
        	}
        }
//        onLeave: function(index, nextIndex, direction){console.info('onleave @ '+index);},
//    	afterRender: function(){console.info('afterrender')},
//    	afterResize: function(){console.info('afterresise')}
    });
    $.fn.fullpage.setAllowScrolling(false); //we only navigate using the next/previous buttons
    
	$('#participant-info__nav').bind('click',function(e) {		
		if(e) e.preventDefault();		
		validateParticipantInfo(); //ss clicked ok -> validate their responses, if ok, move on to instructions		
	});
	
	$('#instructions__nav').bind('click',function(e) {		
		if(e) e.preventDefault();
		$.fn.fullpage.moveSectionDown();
	});

    timeAtStart = getDateTime();
    initializeAssociationTask();
    
//    $("#associations__response").focus();	//focus response box
//	$("#associations__response").select();
    
    if (debug) {
    	participant = {name: "bram", age: "28", gender: 'm'};		
    }
});

/**
 * Check whether the participant info (id, age, gender) is entered correctly.
 * If everything is in order, save the info, and move to the next section.
 * Otherwise, display an error.
 */
function validateParticipantInfo() {
	var allValid = true; //will be set to false if something was filled in incorrectly / not filled in
	var errorString = ""; //we'll keep track of everything the user missed
	
	$('#user-info .highlight').removeClass("highlight"); //remove highlights of any previous entry
	
	//check whether user info was entered correctly
	var name = $("#name").val();
	if (name.length < 3 || name.length == 0) {
		allValid = false;
		$("#name-label").addClass("highlight");
		
		if (name.length == 0) {
			errorString += "Je hebt je EMS-nummer niet ingegeven!<br>";
		} else if (name.length < 4) {
			errorString += "Het EMS-nummer dat je ingegeven hebt is te kort!<br>";
		}
	}	
	
	var age = $("#age").val();
	if (age.length == 0) {
		allValid = false;
		$("#age-label").addClass("highlight");
		errorString += "Je hebt je leeftijd niet ingegeven!<br>";
	}	
	
	var gender = $('input[name=gender]:checked').val();
	if (gender == undefined) {
		allValid = false;
		$("#gender-label").addClass("highlight");
		errorString += "Je hebt je geslacht niet aangeduid!<br>";
	}
	
	if (allValid) {
		participant = {name: name, age: age, gender: gender};		
		$.fn.fullpage.moveSectionDown();
	} else {
		showMessage("Gelieve alle gegevens in te vullen!", errorString);
	}
}

function initializeAssociationTask() {	
	$('.associations__submit').bind('click',function(e) {		//triggered by 'enter' or clicking 'ok'
		if(e) e.preventDefault();								//make sure we stay on this page
		var association = currentTrial.responseHandle.val(); 		
		if (association.length <= 1) { 							//ss did not fill in anything of use
			currentTrial.errorHandle.html("Gelieve een associatie in te vullen!");	//show error message
		} else {
			currentAssociation.response = association;
			processAssociation(); 					//write away response, move on
		}		
	});
	
	$(".associations__response").keypress(function() {
		if (!currentAssociation.firstKeypressRegistered) {
			currentAssociation.firstKeypressRegistered = true;
			currentAssociation.rtToKeypress = new Date().getTime() - currentAssociation.rtStart;
		}
	});
	
	currentTrial = new Object();
	currentAssociation = new Object();
}

function showTrial(index) {		
	currentTrial.index = index;
	currentTrial.cue = $('#associations-' + index).data('cue');
	currentTrial.responseHandle = $("#associations-" + index + " .associations__response");
	currentTrial.a1handle = $("#associations-" + index + " .associations__previous--1");
	currentTrial.a2handle = $("#associations-" + index + " .associations__previous--2");
	currentTrial.errorHandle = $("#associations-" + index + " .associations__error");
	
	resetAssociation();
	currentAssociation.index = 1;	
	console.info("loaded cue "+index + ", "+currentTrial.cue)
}

function resetAssociation() {
	currentAssociation.rtStart = new Date().getTime();  //reset RT
	currentAssociation.rtToKeypress = -1;
	currentAssociation.rtToSubmit = -1;		
	currentAssociation.firstKeypressRegistered = false;
}

/**
 * Write away response, move on to next association or cue.
 */	
function processAssociation() {
	currentAssociation.rtToSubmit = new Date().getTime() - currentAssociation.rtStart;
	writeResponse(currentTrial, currentAssociation);
	
	resetAssociation();
	
	//show next association, or next cue
	if (currentAssociation.index == 1) { //this was ss's first association
		currentTrial.a1handle.html(currentAssociation.response); //display this association while ss thinks of further associations
		currentTrial.responseHandle.attr("placeholder", "Geef een tweede associatie");		
		currentAssociation.index++;		
	} else if (currentAssociation.index == 2) { 	//this was ss's second association
		currentTrial.a2handle.html(currentAssociation.response); //display this association while ss thinks of further associations
		currentTrial.responseHandle.attr("placeholder", "Geef een laatste associatie");
		currentAssociation.index++;
	} else {
		$.fn.fullpage.moveSectionDown(); 
		
//		showNextTrial(); //pp gave three associations -> move to next cue
	}				
} 


/**
 * @param title Title of the popup.
 * @param message Content of the popup.
 */
function showMessage(title, message) {
	$("<div>" + message + "</div>").dialog({
		modal: true,
		title: title,
		width: 700,
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );	
			}
		}
	});
}

function initWriting() {
	filename = participant.name + "_" + timeAtStart + ".txt";
	var header = "EMS\tage\tgender\ttimeAtStart\ttimeAtResponse\tcue\tcueNb\tassociation\tassociationNb\tRT\n";
	
	writeToDisk(filename, header, false);
}

/**
 * Write out all data for this participant to disk.
 */
function writeResponse(cue, cueNb, association, associationNb, RT) {		
	var line = participant.name + "\t" + participant.age + "\t" + participant.gender + "\t" + timeAtStart + "\t" + getDateTime() + "\t"
		+ cue + "\t" + cueNb + "\t" + association + "\t" + associationNb + "\t" + RT + "\n";	
	writeToDisk(filename, line, true);	
}

/**
 * Create a file with the indicated data at the indicated location.
 */
function writeToDisk(filename, data, append) {
	$.ajax(	
			{	
				type: "POST",
				url: "php/write_data.php",
				data: "filename=" + filename + "&data=" + data + "&append=" + (append? 1 : 0) + "&ajax=1&byajax=1",
				cache: false
			}
	);
}

/**
 * Return a formatted string containing current date and time.
 */
function getDateTime() {
	var d = new Date();
	var now = {month: d.getMonth(), day: d.getDate(), hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds()};

	//pad with leading zero where necesary
	for (var key in now) {
		if (now.hasOwnProperty(key)) {
			now[key] = now[key] + "";
			if (now[key].length == 1) {
				now[key] = "0" + now[key];
			}			
		}
	}
	
	return now.month + "_" + now.day + "_" + now.hour + "_" + now.minute + "_" + now.second;
}