$(document).ready(function() {
	$('input[data-id=":amenity_id"][data-name=":amenity_name"]').on('change', function(){
		if ($(this).is(":checked")) {
			$('.amenities > h4').each
			console.log('mise à jour');
		} else {
			console.log('remove');
		}
	});
});
