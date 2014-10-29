<?php 

include 'input/cues.php';
//in this file, the variable $cues should be defined; 
//this is a list of all words that will be presented, in the order they should be presented
?>

<?php 
for ($i = 1; $i <= count($cues); $i++) {
    ?>	    
    <div id = "associations-<?php echo $i;?>" class = "associations section" data-anchor = "<?php echo $i;?>" data-cue = "<?php echo $cues[$i - 1];?>">
		<div class = "associations__cue"><?php echo $cues[$i - 1];?></div>
		<div class = "associations__previous associations__previous--1">...</div>
		<div class = "associations__previous associations__previous--2">...</div>
		<div class = "associations__previous">...</div>
		<div class = "associations__error">&nbsp;</div>		
		<div>
<!--		      <input class = "associations__response" type="text" autocomplete="off" autofocus autocapitalize="off" autocorrect="off" placeholder="Geef een eerste associatie"> -->
		</div>
		<div><button class = "associations__submit">OK</button></div>	
	</div>
	   
	<?php  
}
?>

