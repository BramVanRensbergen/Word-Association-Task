<?php header('Content-type: text/html; charset=utf-8');?> 
<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon" type="image/x-icon" href="core/img/favicon.png">
	<meta charset="UTF-8">
	<title>Woord Associaties</title>	
	<link rel="stylesheet" type="text/css" href="core/external/jquery-ui/jquery-ui.min.css">		 <!-- Used for some UI elements -->
	<link rel="stylesheet" type="text/css" href="core/external/full-page/jquery.fullPage.css" />  <!-- Used for transitioning between pages -->
	<link rel="stylesheet" type="text/css" href="core/css/style.css">	<!-- style specific to this experiment -->
	<script type="text/javascript" src="core/external/jquery-2.1.1.min.js"></script>  
	<script type="text/javascript" src="core/external/jquery-ui/jquery-ui.min.js"></script>	 <!-- Used for some UI elements -->
	<script type="text/javascript" src="core/external/full-page/vendors/jquery.slimscroll.min.js"></script> <!-- Used for transitioning between pages -->
	<script type="text/javascript" src="core/external/full-page/jquery.fullPage.min.js"></script> <!-- Used for transitioning between pages -->
	<script type="text/javascript" src="input/cues.js"></script> <!-- Cue items are defined here, obtained running the function getCues() -->
	<script type="text/javascript" src="core/js/associations.js"></script> <!-- Script that handles the experiment -->
</head>
<body>
    
<div id = "content">

	<div id = "participant-info" class = "section" data-anchor = "Welkom">
		<?php include 'core/content/participant_info.html';?>	
		<div><button class = "nav-button" id = "participant-info__nav">Verder</button></div>	
	</div>
	
	<div id = "instructions" class = "section active" data-anchor = "Instructies">
		<?php include 'core/content/instructions.html';?>		
		<div><button class = "nav-button" id = "instructions__nav">Verder</button></div>			
	</div>	

	<div id = "instructions" class = "section" data-anchor = "Taak">
		<?php include 'core/content/task.html'; ?>	
	</div>	
	
	<div id = "goodbye" class = "section" data-anchor = "Bedankt!">
		<?php include 'core/content/goodbye.html'; ?>	
	</div>
</div>
<noscript>
	<style type="text/css">#content {display:none;} </style>
	<div class="noscriptmsg">Je hebt javascript nodig om aan dit experiment deel te nemen :(</div>
</noscript>	
</body>