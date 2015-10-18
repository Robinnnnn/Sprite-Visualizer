var SettingsController = function() {
	this.Rotation = 7.5;
	this.Material = true;
};

function initGUI() {
	settings = new SettingsController();
	var gui = new dat.GUI();
	gui.add(settings, 'Rotation', 0, 10).onChange(function(value) {

		rotationSpeed = (value * -0.0006 + 0.003) * 1.5;
	});
	
	gui.add(settings, 'Material', ['Snow', 'Dippin Dots', 'Blue Bubbles', 'Pink Bubbles', 'Green Bubbles', 'All Bubbles', 'Target', 'Retro', 'Light Blue Blocks', 'Light Pink Blocks', 'Light Green Blocks', 'All Blocks']).onChange(function(choice) {
		if (choice === 'Snow') {
			reanimate(snow);
		} else if (choice === 'Dippin Dots') {
			reanimate(bluePearls);
		} else if (choice === 'Blue Bubbles') {
			reanimate(blueBubbles);
		} else if (choice === 'Pink Bubbles') {
			reanimate(pinkBubbles);
		} else if (choice === 'Green Bubbles') {
			reanimate(greenBubbles);
		} else if (choice === 'All Bubbles') {
			reanimate(blueBubbles, pinkBubbles, greenBubbles);
		} else if (choice === 'Target') {
			reanimate(targets);
		} else if (choice === 'Retro') {
			reanimate(solidBlueBlocks);
		} else if (choice === 'Light Blue Blocks') {
			reanimate(lightBlueBlocks);
		} else if (choice === 'Light Pink Blocks') {
			reanimate(lightPinkBlocks);
		} else if (choice === 'Light Green Blocks') {
			reanimate(lightGreenBlocks);
		} else if (choice === 'All Blocks') {
			reanimate(lightGreenBlocks, lightPinkBlocks, lightBlueBlocks)
		}
	})	
}