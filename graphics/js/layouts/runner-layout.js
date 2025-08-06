'use strict';

$(() => {
	loadFromSpeedControl();

	function loadFromSpeedControl() {
		const speedcontrolBundle = 'nodecg-speedcontrol';

		const urlParams = new URLSearchParams(window.location.search);
		const playerIndex = urlParams.get('player');

		let runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
		runDataActiveRun.on('change', (newVal) => {
			if (newVal)
				updateSceneFields(newVal);
		});

		function updateSceneFields(runData) {
			let currentTeamsData = runData.teams;

			// Reset all runner data.
			$('.runner-name').add('.pronouns').text('');			

			for (let team of currentTeamsData) {
				let player = team.players[playerIndex];

				// Update runner name.
				fadeText('#runner-name', player.name, true);

				// Update pronouns.
				let pronouns = player.pronouns;
				if (pronouns === undefined) {
					$('#pronouns').hide();
				} else {
					$('#pronouns').show();
					fadeText('#pronouns', pronouns, true);
				}

				// Update flag.
				$('#flag-img').attr('src', 'img/flags/' + player.country + '.png');

				// Update starter.
				$('#game-img').attr('src', 'img/logos/' + player.customData.runnerStarter + '.png');
			}
		}
	}
});
