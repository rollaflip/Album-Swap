$(document).ready(function() {
  console.log('ready!');
  getAlbumsByUserId(1, 'left');
  getAlbumsByUserId(2, 'right');

 ////////////////// change selected to red
 $("body").on("click", ".album__row", function () {

     if(this.className.indexOf('selected')<0) dragArr.add(this.id)
     else dragArr.delete(this.id)


         $(this).toggleClass("selected");
     console.log(dragArr)
  });

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
    var value = $('#user-submit')
      .siblings('input')
      .val();
    if (value < 2 || value > 10) {
      alert('User Id must be between 2 and 10');
      // throw new Error('User Id must be between 2 and 10');
    } else {
      getUserById(value);
      getAlbumsByUserId(value, 'right');
    }
});
});



const getUserById = async userId => {
  const url = 'https://jsonplaceholder.typicode.com/users/';

  try {
    const user = await $.get(`${url}${userId}?`, data => {
      data;
    });
    console.log(user.name);
    $('#their-name').text(
      `${user.name.split(' ')[user.name.split(' ').length - 2]}'s Albums`
    );
  } catch (error) {
    return error;
  }
};
const getAlbumsByUserId = async (userId, direction) => {
  const url = 'https://jsonplaceholder.typicode.com/albums';
  const whichTable = direction === 'left' ? '#user-1' : '#user-2';

  try {
    $(whichTable).children('.album__row').remove();
    const albums = await $.get(`${url}?userId=${userId}`);


    albums.map(album => {
      $(whichTable).append(`
        <div class='table__row album__row' id="${
          album.id
        }" data-value="${album}" draggable="true" ondragstart="drag(event)" >
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
      body: JSON.stringify({
        userId: receivingUserId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const json = await album.json();
    return json;
  } catch (error) {
    return error;
  }
};

let dragArr = new Set()

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {

    console.log(ev.target)
  ev.dataTransfer.setData('text', ev.target.id, 0);

  const dragParentId = $(ev.target)
    .parent()
    .attr('id');
  const otherTable = dragParentId === 'user-2' ? '#user-1' : '#user-2';
  $(otherTable).addClass('drop__zone');
  ev.dataTransfer.setData('green-border', otherTable, 1);
}

async function drop(ev) {
    // $('#user-1').append($('.album__row'))
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
console.log(data)
  let dropZone = ev.currentTarget;
  let userId = dropZone.getAttribute('data-value');

  const droppedAlbum = await swapAlbum(userId, data);
  const idToFind = String(droppedAlbum.id);

  [...dragArr].forEach(ele => dropZone.appendChild(document.getElementById(ele)))
//   dropZone.appendChild(document.getElementById(idToFind));

  const thisTable = dropZone.id === 'user-1' ? '#user-1' : '#user-2';
  $(thisTable).removeClass('drop__zone');
  setTimeout(()=> $('.album__row').removeClass("selected"),700)


}



