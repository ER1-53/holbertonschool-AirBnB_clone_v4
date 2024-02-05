$(document).ready(function() {
    var amenities = {};  // Créer un objet pour stocker les ID des commodités cochées

    $('input').on('change', function() {
        let amenityId = $(this).data('id');  // Obtenir l'ID de la commodité
        let amenityName = $(this).data('name');  // Obtenir le nom de la commodité

        if ($(this).is(':checked')) {
            // Si la case est cochée, ajouter l'ID de la commodité à l'objet
            amenities[amenityId] = amenityName;
        } else {
            // Si la case est décochée, supprimer l'ID de la commodité de l'objet
            delete amenities[amenityId];
        }

        // Mettre à jour le tag h4 avec la liste des commodités cochées
        let amenitiesList = Object.values(amenities).join(', ');
        let longueurMax = 35;
        if (amenitiesList.length > longueurMax) {
            amenitiesList = amenitiesList.substring(0, longueurMax) + '...';
        }
        $('.amenities > h4').text(amenitiesList);
	});
});
