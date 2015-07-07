var Hotel;

$(document).ready(function() {
	Hotel = function(data) {
		var self = this;
		eachKeyValue(data, function(key, val) {
			self[key] = val;
		});
		if (currentDay.hotel) {
			currentDay.hotel.delete();
		}
		// this.buildMarker()
		// 	.drawMarker()
		// 	.buildItineraryItem()
		// 	.drawItineraryItem();


		currentDay.hotel = this;
		this.updateDatabase();
	}

	Hotel.prototype = generateAttraction({
		icon: '/images/lodging_0star.png',
		$listGroup: $('#my-hotel .list-group'),
		$all: $('#all-hotels'),
		all: all_hotels,
		constructor: Hotel
	});

	Hotel.prototype.updateDatabase = function() {
		$.post('/days/' + currentDay.id + '/hotel', {
				name: this.name
			})
			.done(function(data) {
				console.log('UPDATE response data')
				this.id = data
				this.buildMarker()
					.drawMarker()
					.buildItineraryItem()
					.drawItineraryItem();
			}.bind(this))
		return this;
	}

	Hotel.prototype.delete = function() {
		currentDay.hotel
			.eraseMarker()
			.eraseItineraryItem();
		currentDay.hotel = null;

		$.ajax({
			url: '/days/' + currentDay.id + '/hotel',
			type: 'DELETE',
			success: function(data) {
				console.log('DELETE response data', data)
			},
			error: function(err) {
				console.log('Error: ', err)
			}
		})


	};
});