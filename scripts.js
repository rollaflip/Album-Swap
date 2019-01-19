$(document).ready(function() {
  console.log('ready!');
  getAlbumsByUserId(1, 'left');
  getAlbumsByUserId(2, 'right');


$('.filter').keyup(function() {
    const filter = $(this).val()

    $('.album__row').each(function() {
      if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();

      } else {
        $(this).show();
      }
    });
  });

});
const getUserById = async userId => {
  const url = 'https://jsonplaceholder.typicode.com/users/';
  try {
    const user = await $.get(`${url}${userId}?`, data => {
      console.log(data.name);
    });
  } catch (error) {
    return error;
  }
};
const getAlbumsByUserId = async (userId, direction) => {
  const url = 'https://jsonplaceholder.typicode.com/albums';
  const whichTable = direction === 'left' ? '#user-1' : '#user-2';
  if (!userId > 0) throw new Error('User Id must be > 0');
  try {
    const albums = await $.get(`${url}?userId=${userId}`);
    // .fail(()=> {alert( "error" )});
    console.log(albums);
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
    const swappedAlbum = await fetch(`${url}/${albumId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: receivingUserId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));
  } catch (error) {
    return error;
  }
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
  // let user = ev.target.getAttribute('data-value')
  // ev.dataTransfer.setData("user", user);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
  //   let userId = ev.dataTransfer.getData("user");
  //   let userId = ev.dataTransfer.getAttribute('data-value')
  let userId = ev.currentTarget.getAttribute('data-value');

  swapAlbum(userId, data);
  ev.currentTarget.appendChild(document.getElementById(data));
}



// function submitHandler(e){

// }
$('button').click(function(){
    var value = $('button').siblings('input').val();
    alert(value);
})
