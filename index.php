<?php header('Content-type: text/html; charset=utf-8');?> 
<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon" type="image/x-icon" href="core/img/favicon.png">
	<meta charset="UTF-8">
	<title>Woord Associaties</title>	
	<link rel="stylesheet" type="text/css" href="core/external/jquery-ui/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="core/external/full-page/jquery.fullPage.css" /> 
	<link rel="stylesheet" type="text/css" href="core/css/style.css">	
	<script type="text/javascript" src="core/external/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="core/external/jquery-ui/jquery-ui.min.js"></script>	
	<script type="text/javascript" src="core/external/full-page/vendors/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="core/external/full-page/jquery.fullPage.min.js"></script>
	<script type="text/javascript" src="core/js/associations.js"></script>
</head>
<body>
    
<div id = "content">
	<?php include 'core/content/participant_info.php';?>	
	<?php include 'core/content/instructions.php';?>		
	<?php include 'core/content/task.php'; ?>	
	<?php include 'core/content/goodbye.php'; ?>	
</div>
<noscript>
	<style type="text/css">#content {display:none;} </style>
	<div class="noscriptmsg">Je hebt javascript nodig om aan dit experiment deel te nemen :(</div>
</noscript>	
</body>