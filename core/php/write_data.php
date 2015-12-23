<?php 
// write the data in $_POST["data"] to the file $_POST["filename"]

	if ($_POST["append"]) {
		$mode = "a";
	} else {
		$mode = "w";
	} 
	
 	$fh = fopen("../../output/".$_POST["filename"], $mode);
	fwrite($fh, addslashes($_POST["data"]));
    fclose($fh); 
?>