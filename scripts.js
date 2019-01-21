$(document).ready(function() {
  getAlbumsByUserId(1, 'left');
  getAlbumsByUserId(2, 'right');

  //Live Album Filter
  $('.filter').keyup(function() {
    const filter = $(this).val();
    const albumRowByParent = $(this)
      .parent()
      .parent('.table')
      .children('.album__row');

    $(albumRowByParent).each(function() {
      if (
        $(this)
          .text()
          .search(new RegExp(filter, 'i')) < 0
      ) {
        $(this).fadeOut();
      } else $(this).show();
    });
  });

  $('#user-submit').click(() => {
    const value = $('#user-submit').siblings('input').val();
    if (value < 2 || value > 10) {
        alert('User Id must be between 2 and 10');
    } else {
      getUserById(value);
      getAlbumsByUserId(value, 'right');
    }
  });
   //Highlight selected albums
   $('body').on('click', '.album__row', function() {
    if (!$(this).hasClass('selected')) multiSelect.add(this.id);
    else multiSelect.delete(this.id);

    $(this).toggleClass('selected');
    // console.log(multiSelect);
  });
});

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

const getAlbumsByUserId = async (userId, direction) => {
  const url = 'https://jsonplaceholder.typicode.com/albums';
  const whichTable = direction === 'left' ? '#table-1' : '#table-2';

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

let multiSelect = new Set();

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
