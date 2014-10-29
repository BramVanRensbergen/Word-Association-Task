function getCues() {
	var N_FILLERS = 16; //nb of filler items we'll present to each participant

	//filler items
	//some items belong in a "set"; of each set, only one item will be presented to any given participant
	//(because these items are very similar]
	var fillers = [
		["afwachtend",  0],
		["aimabel", 0],
		["beschermend", 0],
		["competitief", 0],
		["doelbewust", 1],
		["doorzettend", 1],
		["empatisch", 0],
		["geïnteresseerd", 0],
		["gemoedelijk", 0],
		["georganiseerd", 0],
		["goedgeluimd", 2],
		["goedhartig", 2],
		["goedlachs", 2],
		["hardwerkend", 0],
		["helpend", 3],
		["hulpvaardig", 3],
		["hulpzaam", 3],
		["humoristisch", 0],
		["idealistisch", 0],
		["initiatiefnemend", 4],
		["initiatiefnemer", 4],
		["initiatiefrijk", 4],
		["leidinggevend", 0],
		["lichtgeraakt", 0],
		["liefhebbend", 0],
		["luisterend", 0],
		["medelevend", 0],
		["meewerkend", 0],
		["mopperig", 0],
		["onderzoekend", 0],
		["ontvlambaar", 0],
		["onzelfzeker", 0],
		["opvliegend", 0],
		["participerend", 0],
		["perfectionistisch", 0],
		["plichtsbewust", 5],
		["plichtsgetrouw", 5],
		["praatgraag", 6],
		["praatvaardig", 6],
		["praatzaam", 6],
		["prikkelbaar", 0],
		["respectvol", 0],
		["sarcastisch", 0],
		["slechte verliezer", 0],
		["sympathiek", 0],
		["temperamentvol", 0],
		["teruggetrokken", 7],
		["terughoudend", 7],
		["twijfelaar", 0],
		["vastbesloten", 0],
		["verbeeldingsrijk", 0],
		["verdraagzaam", 0],
		["vindingrijk", 0],
		["volhardened", 8],
		["volhoudend", 8],
		["vooruitstrevend", 0],
		["vredevol", 0],
		["zelfbewust", 0],
		["zelfredzaam", 0],
		["zorgend", 0]
	];
	
	var popular = ["Coca Cola", "Eristoff", "H&M", "Kellogs", "Nike", "Sony"];
	var cars = ["BMW (auto)", "Ferrari (auto)", "Peugeot (auto)", "Porsche (auto)", "Volkswagen (auto)", "Volvo (auto)"];
	
	fillers = shuffle(fillers);
	popular = shuffle(popular);
	cars = shuffle(cars);
	
	var cues = [];
	var used_sets = [];
	
	var it = 0;
	while (cues.length < N_FILLERS) {
		if (it++ > 10000 || fillers.length == 0) { //this should never happen...
			console.error("Error generating cues...");
			break;
		} else {
			var item = fillers.shift();
			if (item[1] == 0 || jQuery.inArray(item[1], used_sets) > 0) { //item does not belong to a set, or is the first of it's set
				cues.push(item[0]);
				used_sets.push(item[1]);				
			}
		}
	}
	
	var carFirst = Math.random() > 0.5;; //true: car at 4 and 14, foreign at 9 and 19; false: vice versa
	cues.splice(3,  0, carFirst ? cars[0]     : popular[0] 	);
	cues.splice(8,  0, carFirst ? popular[0]  : cars[0]  	);
	cues.splice(13, 0, carFirst ? cars[1]     : popular[1] 	);
	cues.splice(18, 0, carFirst ? popular[1]  : cars[1]  	);
	//note: these splice commands insert the element at that index, shifting the rest of the array one element forward
	
	return cues;
	
	/**
	 * Return the indicated array, with all elements shuffled.
	 */
	function shuffle(array) {
		var counter = array.length, temp, index;

		// While there are elements in the array
		while (counter > 0) {

			index = Math.floor(Math.random() * counter); // Pick a random index
			counter--;

			// Swap the last element with counter
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}
		return array;
	}	
}
