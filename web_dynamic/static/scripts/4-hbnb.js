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

$(document).ready(function() {
    $.get('http://127.0.0.1:5001/api/v1/status', function(data, textStatus) {
        if (textStatus === 'success') {
            if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }
    })
})



$(document).ready(function() {
  fetch('http://127.0.0.1:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let place = data[i];
      let article = $(
        `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`
      );
      $('section.places').append(article);
    }
  });
});


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

  $.get('http://127.0.0.1:5001/api/v1/status', function(data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $('button').on('click', function() {
    fetch('http://127.0.0.1:5001/api/v1/places_search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amenities: Object.keys(amenities)})
    })
    .then(response => response.json())
    .then(data => {
      $('section.places').empty();  // Supprimer les articles existants
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        let article = $(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`
        );
        $('section.places').append(article);
      }
    });
  });
});
