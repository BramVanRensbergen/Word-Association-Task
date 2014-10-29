<?php 
$N_FILLERS = 16; //nb of filler items we'll present to each participant

//filler items
//some items belong in a "set"; of each set, only one item will be presented to any given participant
//(because these items are very similar)
$fillers = array(
	array("afwachtend",  0),
	array("aimabel", 0),
	array("beschermend", 0),
	array("competitief", 0),
	array("doelbewust", 1),
	array("doorzettend", 1),
	array("empatisch", 0),
	array("geïnteresseerd", 0),
	array("gemoedelijk", 0),
	array("georganiseerd", 0),
	array("goedgeluimd", 2),
	array("goedhartig", 2),
	array("goedlachs", 2),
	array("hardwerkend", 0),
	array("helpend", 3),
	array("hulpvaardig", 3),
	array("hulpzaam", 3),
	array("humoristisch", 0),
	array("idealistisch", 0),
	array("initiatiefnemend", 4),
	array("initiatiefnemer", 4),
	array("initiatiefrijk", 4),
	array("leidinggevend", 0),
	array("lichtgeraakt", 0),
	array("liefhebbend", 0),
	array("luisterend", 0),
	array("medelevend", 0),
	array("meewerkend", 0),
	array("moppering", 0),
	array("onderzoekend", 0),
	array("ontvlambaar", 0),
	array("onzelfzeker", 0),
	array("opvliegend", 0),
	array("participerend", 0),
	array("perfectionistisch", 0),
	array("plichtsbewust", 5),
	array("plichtsgetrouw", 5),
	array("praatgraag", 6),
	array("praatvaardig", 6),
	array("praatzaam", 6),
	array("prikkelbaar", 0),
	array("respectvol", 0),
	array("sarcastisch", 0),
	array("slechte verliezer", 0),
	array("sympathiek", 0),
	array("temperamentvol", 0),
	array("teruggetrokken", 7),
	array("terughoudend", 7),
	array("twijfelaar", 0),
	array("vastbesloten", 0),
	array("verbeeldingsrijk", 0),
	array("verdraagzaam", 0),
	array("vindingrijk", 0),
	array("volhardened", 8),
	array("volhoudend", 8),
	array("vooruitstrevend", 0),
	array("vredevol", 0),
	array("zelfbewust", 0),
	array("zelfredzaam", 0),
	array("zorgend", 0)
);

$popular = array("Coca Cola", "Eristoff", "H&M", "Kellogs", "Nike", "Sony");
$cars = array("BMW (auto)", "Ferrari (auto)", "Peugeot (auto)", "Porsche (auto)", "Volkswagen (auto)", "Volvo (auto)");

shuffle($fillers);
shuffle($popular);
shuffle($cars);

$cues = array();
$used_sets = array();

while (count($cues) < $N_FILLERS) {
	if (count($fillers) == 0) { //this should never happen...
		break;
	} else {
		$item = array_shift($fillers);
		if ($item[1] == 0 || !in_array($item[1], $used_sets)) { //item does not belong to a set, or is the first of it's set
			array_push($cues, $item[0]);
			array_push($used_sets, $item[1]);
		}
	}
}

$carFirst = rand(0, 1); //true: car at 4 and 14, foreign at 9 and 19; false: vice versa
array_splice($cues, 3,  0, $carFirst ? $cars[0]     : $popular[0] 	);
array_splice($cues, 8,  0, $carFirst ? $popular[0] 	: $cars[0]  	);
array_splice($cues, 13, 0, $carFirst ? $cars[1]     : $popular[1] 	);
array_splice($cues, 18, 0, $carFirst ? $popular[1] 	: $cars[1]  	);
//note: these splice commands insert the element at that index, shifting the rest of the array one element forward


?>