var Restaurant;

$(document).ready(function() {
	Restaurant = function(data) {
		var self = this;
		eachKeyValue(data, function(key, val) {
			self[key] = val;
		});
		// this.buildMarker()
		// 	.drawMarker()
		// 	.buildItineraryItem()
		// 	.drawItineraryItem();
		currentDay.restaurants.push(this);
		this.updateDatabase()
	}

	Restaurant.prototype = generateAttraction({
		icon: '/images/restaurant.png',
		$listGroup: $('#my-restaurants .list-group'),
		$all: $('#all-restaurants'),
		all: all_restaurants,
		constructor: Restaurant
	});

	Restaurant.prototype.updateDatabase = function() {
		$.post('/days/' + currentDay.id + '/restaurants', {
				name: this.name
			})
			.done(function(data) {
				console.log('UPDATE response data')
				this.id = data
				console.log(this.id)
				this.buildMarker()
					.drawMarker()
					.buildItineraryItem()
					.drawItineraryItem();
			}.bind(this))
		return this;
	}

	Restaurant.prototype.delete = function() {
		$.ajax({
			url: '/days/' + currentDay.id + '/restaurants/' + this.id,
			type: 'DELETE',
			success: function(data) {
				console.log('DELETE response data', data)
				var index = currentDay.restaurants.indexOf(this),
					removed = currentDay.restaurants.splice(index, 1)[0];
				removed
					.eraseMarker()
					.eraseItineraryItem();
			},
			error: function(err) {
				console.log('Error: ', err)
			}
		})
	};
});