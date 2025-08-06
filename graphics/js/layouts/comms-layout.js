'use strict';

$(() => {
	loadFromSpeedControl();

	function loadFromSpeedControl() {
		const speedcontrolBundle = 'nodecg-speedcontrol';

		let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
		runDataActiveRun.on('change', (newVal) => {
			if (newVal)
				updateSceneFields(newVal);
		});

		function updateSceneFields(runData) {
			const customData = runData.customData;

			// Reset all comms data
			$('.comms-name').add('.comms-pronouns').text('').show();

			// Fade in all provided values
			Object.entries(customData).map(([key, val]) => {
				fadeText('#' + key, val, true);
			});

			// After values fade in, merge names and pronouns dynamically
			setTimeout(() => {
				// Build a map of name -> pronouns pairings
				for (const [key, val] of Object.entries(customData)) {
					if (key.endsWith("Name")) {
						const baseId = key.replace("Name", ""); // e.g. "commentator1"
						const nameId = key;
						const pronounId = baseId + "Pronouns";

						mergeCommsDisplay(nameId, pronounId);
					}
				}
			}, 500); // Delay for fadeText to finish (adjust if needed)
		}

	}
	function mergeCommsDisplay(nameId, pronounId) {
	const nameEl = document.getElementById(nameId);
	const pronounEl = document.getElementById(pronounId);

	if (!nameEl) return;

	const name = nameEl.textContent.trim();
	const pronouns = pronounEl?.textContent.trim();

	if (name) {
		nameEl.textContent = (pronouns) ? `${name} (${pronouns})` : name;
		if (pronounEl) pronounEl.style.display = "none"; // Hide separate pronouns
	}
}

});
