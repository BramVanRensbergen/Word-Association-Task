function getCues() {
	var cues = ['elephant', 'rhino', 'cat', 'dog', 'mouse', 'moose', 'lion'];
	
	return shuffle(cues);
		
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
