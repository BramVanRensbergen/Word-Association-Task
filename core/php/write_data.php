<?php 
	
	if ($_POST["append"]) {
		$mode = "a";
	} else {
		$mode = "w";
	} 
	
 	$fh = fopen("../output/".$_POST["filename"], $mode);
	fwrite($fh, $_POST["data"]);
    fclose($fh); 
?>