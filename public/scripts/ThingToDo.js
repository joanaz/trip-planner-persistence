var ThingToDo;

$(document).ready(function() {
	ThingToDo = function(data) {
		var self = this;
		eachKeyValue(data, function(key, val) {
			self[key] = val;
		});
		// this.buildMarker()
		// 	.drawMarker()
		// 	.buildItineraryItem()
		// 	.drawItineraryItem();
		currentDay.thingsToDo.push(this);
		this.updateDatabase()
	}

	ThingToDo.prototype = generateAttraction({
		icon: '/images/star-3.png',
		$listGroup: $('#my-things-to-do .list-group'),
		$all: $('#all-things-to-do'),
		all: all_things_to_do,
		constructor: ThingToDo
	});

	ThingToDo.prototype.updateDatabase = function() {
		$.post('/days/' + currentDay.id + '/thingsToDo', {
				name: this.name
			})
			.done(function(data) {
				console.log('UPDATE response data', data)
				this.buildMarker()
					.drawMarker()
					.buildItineraryItem()
					.drawItineraryItem();
			}.bind(this))
		return this;
	}

	ThingToDo.prototype.delete = function() {
		var index = currentDay.thingsToDo.indexOf(this),
			removed = currentDay.thingsToDo.splice(index, 1)[0];
		removed
			.eraseMarker()
			.eraseItineraryItem();
	};
});