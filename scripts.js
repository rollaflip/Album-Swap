$(document).ready(function() {
  getAlbumsByUserId(1, '#table-1');
  getAlbumsByUserId(2, '#table-2');

  //Live Album Filter
  $('.filter').keyup(function() {
    const filter = $(this).val();
    const albumRowByParent = $(this)
      .parent()
      .parent('.table')
      .children('.album__row');

    $(albumRowByParent).each(function() {
      if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      } else $(this).show();
    });
  });

  //User Search Submit Button Handler
  $('#user-submit').click(function(){
    const value = $(this).siblings('input').val();
    const message = "#invalid-message"
    const inputField = $(this).siblings('input')

    if (value < 2 || value > 10) {
      if($(message > ".hidden")) $(message).removeClass("hidden")
      } else {
        $(message).addClass('hidden')
        getUserById(value);
        getAlbumsByUserId(value, '#table-2');
      }
      inputField.val("")
  });

   //User Search Input "Enter" Key Handler
  $("#search-input").on("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) $("#user-submit").click();
  });

  //Highlight Selected Albums
  $('body').on('click', '.album__row', function() {
    if (!$(this).hasClass('selected')) multiSelect.add(this.id);
    else multiSelect.delete(this.id);
    $(this).toggleClass('selected');
  });
});

//User GET
const getUserById = async userId => {
  const url = 'https://jsonplaceholder.typicode.com/users/';

  try {
    const user = await $.get(`${url}${userId}?`, data => data);
    $('#their-name').text(
      `${user.name.split(' ')[user.name.split(' ').length - 2]}'s Albums`
    );
  } catch (error) {
    return error;
  }
};

//Album GET By UserID
const getAlbumsByUserId = async (userId, whichTable) => {
  const url = 'https://jsonplaceholder.typicode.com/albums';

  try {
    $(whichTable).children('.album__row').remove();
    const albums = await $.get(`${url}?userId=${userId}`);

    albums.map(album => {
      $(whichTable).append(`
        <div class='table__row album__row'
            id="${album.id}"
            data-value="${album}" draggable="true" ondragstart="drag(event)">
            <div class='table__cell table__cell--short' >${album.id}</div>
            <div class='table__cell table__cell'>${album.title}</div>
        </div>
        `);
    });
  } catch (error) {
    return error;
  }
};

//Album Swap PATCH
const swapAlbum = async (receivingUserId, albumId, direction) => {
  const url = 'https://jsonplaceholder.typicode.com/albums';

  try {
    const album = await fetch(`${url}/${albumId}`, {
      method: 'PATCH',
      body: JSON.stringify({userId: receivingUserId}),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    return await album.json();
  } catch (error) {
    return error;
  }
};

//Stores Multi-Drop Albums
let multiSelect = new Set();

//Drag & Drop Functions
const allowDrop = ev => ev.preventDefault();

const drag = (ev) =>{
  ev.dataTransfer.setData('text', ev.target.id);
  const originTableId = $(ev.target).parent().attr('id');
  const dropZone = originTableId === 'table-2' ? '#table-1' : '#table-2';

  $(dropZone).addClass('drop__zone');
}

const drop = async ev => {
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
  let dropZone = ev.currentTarget;
  let userId = dropZone.getAttribute('data-value');

  [...multiSelect].map(async albumId => {
    const droppedAlbum = await swapAlbum(userId, albumId);
    dropZone.appendChild(document.getElementById(droppedAlbum.id));
  });
  droppedAlbum = await swapAlbum(userId, data);
  dropZone.appendChild(document.getElementById(droppedAlbum.id));

  $('.table').removeClass('drop__zone');
  multiSelect = new Set();
  $(`#${droppedAlbum.id}`).addClass('selected');
  setTimeout(() => $('.album__row').removeClass('selected'), 600);
}
