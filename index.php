<?php header('Content-type: text/html; charset=utf-8');?> 
<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon" type="image/x-icon" href="core/img/favicon.png">
	<meta charset="UTF-8">
	<title>Woord Associaties</title>	
	<link rel="stylesheet" type="text/css" href="core/css/style.css">	
	<script type="text/javascript" src="core/external/jquery-2.1.1.min.js"></script>  
	<script type="text/javascript" src="input/cues.js"></script>
	<script type="text/javascript" src="core/js/associations.js"></script>
</head>
<body>
    
<div id = "content">

	<div id = "participant-info" class = "page">
		<?php include 'core/content/participant_info.html';?>	
		<div><button class = "nav-button" id = "participant-info__nav">Verder</button></div>	
	</div>
	
	<div id = "instructions" class = "page">
		<?php include 'core/content/instructions.html';?>		
		<div><button class = "nav-button" id = "instructions__nav">Verder</button></div>			
	</div>	

	<div id = "task" class = "page">
		<?php include 'core/content/task.html'; ?>	
	</div>	
	
	<div id = "goodbye" class = "page">
		<?php include 'core/content/goodbye.html'; ?>	
	</div>
</div>
<noscript>
	<style type="text/css">#content {display:none;} </style>
	<div class="noscriptmsg">Je hebt javascript nodig om aan dit experiment deel te nemen :(</div>
</noscript>	
</body>