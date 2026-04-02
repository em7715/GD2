// Isotope filter
$(function () {
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows',
    getSortData: {
      title: '[data-title]'
    },
    sortBy: 'title',
    sortAscending: true
  });

  $('.film-filters').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    if (!filterValue) {
      return;
    }
    $grid.isotope({
      filter: filterValue,
      sortBy: 'title',
      sortAscending: true
    });
    $('.film-filters button').removeClass('is-checked');
    $(this).addClass('is-checked');
  });
});

// Flickity carousel
$(".album-thumbs").flickity({
    wrapAround: true,
    pageDots: false
})



// 
//  <div class="film-filters">
//              <div class="filters-button-group2">
//                 <button class="is-checked" data-filter="*">Genres</button>
//                  <button data-filter=".Action/Adventure">Action/Adventure</button>
//                 <button data-filter=".Scifi/Fantasy">Sci-Fi/Fantasy</button>
//                 <button data-filter=".Comedy">Comedy</button>
//                 <button data-filter=".Romance">Romance</button>
//                  <button data-filter=".Animation">Animation</button>
//                 <button data-filter=".Crime/Drama/Thriller/Mystery">Crime/Drama/Thriller/Mystery</button>
//                 <button data-filter=".Horror">Horror</button>
//             </div>

//             <div class="filters-button-group3">
//                 <button class="is-checked" data-filter="*">Decades</button>
//                 <button data-filter=".50s">50s</button>
//                 <button data-filter=".60s">60s</button>
//                 <button data-filter=".70s">70s</button>
//                 <button data-filter=".80s">80s</button>
//                  <button data-filter=".90s">90s</button>
//                 <button data-filter=".2000s">2000s</button>
//                 <button data-filter=".2010s">2010s</button>
//                 <button data-filter=".2020s">2020s</button>
//             </div>
//      </div>