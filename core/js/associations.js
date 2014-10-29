var timeAtStart;		//keep track of time at which the experiment start
var participant;		//will contain user id, age, gender
var filename;
var cues;
var debug = false;

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
        	if (anchorLink != undefined) {
        		document.title = anchorLink;    
        	}
        }
    });
    $.fn.fullpage.setAllowScrolling(false); //we only navigate using the next/previous buttons
    
	$('#participant-info__nav').bind('click',function(e) {		
		if (e) e.preventDefault();		
		validateParticipantInfo(); //ss clicked ok -> validate their responses, if ok, move on to instructions		
	});
	
	$('#instructions__nav').bind('click',function(e) {		
		if (e) e.preventDefault();
		startAssociationTask();
	});

    timeAtStart = getDateTime();
    cues = getCues(); //defined in ../../input/cues.js
    
    if (debug) {
    	participant = {name: "admin", age: "99", gender: 'x'};		
    	initWriting();
    	startAssociationTask();
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
		initWriting();
		$.fn.fullpage.moveSectionDown();
	} else {
		showMessage("Gelieve alle gegevens in te vullen!", errorString);
	}
}

/**
 * Begin the association task. Runs until all cues have been given three associations by user.
 */
function startAssociationTask() {
	var cue = '';		//the cue the ss is giving associations to
	var trialNb = 0;	//trial number; 1 .. number of cues (i.e., 3 associations to each cue are all the same trial)
	var assoIndex = 1;	//1, 2, or 3, depending on whether the association is the first, second, or third association to the current cue
	
	//for each association, we'll save RT to first keypress and RT to submit
	//measured from when cue is displayed or when previous association was submitted, whichever is later
	var RtStart = -1;					 
	var rtToSubmit = -1;
	var rtToKeypress = -1;
	var firstKeypressRegistered = false;
	
	$('#associations__submit').bind('click',function(e) {		//triggered by 'enter' or clicking 'ok'
		if(e) e.preventDefault();								//make sure we stay on this page
		var association = $('#associations__response').val(); 		
		if (association.length <= 1) {//ss did not fill in anything of use 	
			$("#associations__error").html("Gelieve een associatie in te vullen!");	//show error message
			$("#associations__response").focus();	//focus response box
			$("#associations__response").select();
		} else {
			processAssociation(association); 	//write away response, move on
		}		
	});
	
	$("#associations__response").keypress(function() {
		if (!firstKeypressRegistered) {
			firstKeypressRegistered = true;
			rtToKeypress = new Date().getTime() - RtStart;
		}
	});
	
	$('#associations__skip').bind('click',function(e) {	
		if(e) e.preventDefault();								//make sure we stay on this page

		if (assoIndex == 1) { //no responses given yet
			writeResponse(cue, trialNb, '__UNKNOWN__', assoIndex, -1, -1);
			writeResponse(cue, trialNb, '__UNKNOWN__', assoIndex, -1, -1);
			writeResponse(cue, trialNb, '__UNKNOWN__', assoIndex, -1, -1);			
		} else {
			while (assoIndex <= 3) {
				writeResponse(cue, trialNb, '__NO_FURTHER__', assoIndex, -1, -1);
				assoIndex++;				
			}
		}				
		showNextCue();
	});
	
	/**
	 * Write away response, move on to next association or cue.
	 */	
	function processAssociation(association) {
		rtToSubmit = new Date().getTime() - RtStart;
				
		//start by saving the trial	
		writeResponse(cue, trialNb, association, assoIndex, rtToKeypress, rtToSubmit);
		
		//allow for RT measurement of next association
		firstKeypressRegistered = false;
		RtStart = new Date().getTime(); 		
		
		$("#associations__skip").html("Geen Verdere Associaties");
		resetElements();
		
		assoIndex++;
		
		//show next association, or next cue
		if (assoIndex == 2) { //this was ss's first association
			$("#associations__previous--1").text(association); //display this association while ss thinks of further associations
			$("#associations__response").attr("placeholder", "Geef een tweede associatie");		
		} else if (assoIndex == 3) { 	//this was ss's second association
			$("#associations__previous--2").text(association); //display this association while ss thinks of further associations
			$("#associations__response").attr("placeholder", "Geef een laatste associatie");
		} else {			
			showNextCue(); //pp gave three associations -> move to next cue
		}	
	}
	
	function resetElements() {
		$("#associations__error").html("&nbsp;");  //clear (any) error	
		$("#associations__response").val('');	//clear response box		
		$("#associations__response").focus();	//focus response box
		$("#associations__response").select();
	}
	
	/**
	 * Display the next cue
	 */
	function showNextCue() {
		resetElements();
		$("#associations__response").attr("placeholder", "Geef een eerste associatie");
		$("#associations__skip").html("Onbekend Woord");
		$(".associations__previous").html("...");		
		
		
		if (cues.length > 0) {
			cue = cues.shift();
			trialNb++;
			assoIndex = 1;
			$("#associations__cue").html(capitalizeFirst(cue));		
			RtStart = new Date().getTime(); //reset RT			
		} else {
			$.fn.fullpage.moveSectionDown(); //finish experiment
		}		
	}
	
	function capitalizeFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	$("#associations__response").focus();	//focus response box
	$("#associations__response").select();
	trialNb = 0;
	showNextCue();	
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
	var header = "EMS\tage\tgender\ttimeAtStart\ttimeAtResponse\tcue\tcueNb\tassociation\tassociationNb\trtToKeypress\trtToSubmit\n";
	
	writeToDisk(filename, header, false);
}

/**
 * Write out all data for this participant to disk.
 */
function writeResponse(cue, cueNb, association, associationNb, rtToKeypress, rtToSubmit) {		
	var line = participant.name + "\t" + participant.age + "\t" + participant.gender + "\t" + timeAtStart + "\t" + getDateTime() + "\t"
		+ cue + "\t" + cueNb + "\t" + association + "\t" + associationNb + "\t" + rtToKeypress + "\t" + rtToSubmit + "\n";	
	writeToDisk(filename, line, true);	
}

/**
 * Create a file with the indicated data at the indicated location.
 */
function writeToDisk(filename, data, append) {	
	$.ajax(	
			{	
				type: "POST",
				url: "core/php/write_data.php",
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