$(document).ready(function() {
  console.log('ready!');
  getAlbumsByUserId(1, 'left');
  getAlbumsByUserId(2, 'right');
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
        <div class='table__row' id="${album.id}" draggable="true" ondragstart="drag(event)" data-value="${userId}" >
            <div class='table__cell table__cell--short' >${album.id}</div>
            <div class='table__cell table__cell'>${album.title}</div>
        </div>
        `);
    });
  } catch (error) {
    return error;
  }
};
// const swapAlbum = async (newUserId, albumId, direction) => {
//   const url = 'https://jsonplaceholder.typicode.com/albums';
//   const whichTable = (direction === 'left') ?"#user-1" : "#user-2"
//   if (!newUserId > 0) throw new Error('User Id must be > 0');
//   try {
//     const albums = await $.put(`${url}/${albumId}`, {userId: newUserId}, function(result){
//         console.log(result);
//      })
//     // .fail(()=> {alert( "error" )});
//     console.log(albums)

//   } catch (error) {
//     return error;
//   }
// };
const swapAlbum = async (receivingUserId, albumId, direction) => {
  const url = 'https://jsonplaceholder.typicode.com/albums';
//   const tableToAdd = direction === 'left' ? '#user-1' : '#user-2';
//   const tableToRemove = direction === 'left' ? '#user-2' : '#user-1';
//   if (!receivingUserId > 0) throw new Error('User Id must be > 0');
  try {
    const swappedAlbum = await fetch(`${url}/${albumId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: receivingUserId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(response => response.json()).then(json => console.log(json))
//     $(`#${swappedAlbum.id}`).remove();
//     $(tableToAdd).append(`
//     <div class='table__row' id="${swappedAlbum.id}" draggable="true" ondragstart="drag(event) data-value="${user.id}"">
//     <div class='table__cell table__cell--short' >${swappedAlbum.id}</div>
//     <div class='table__cell table__cell'>${swappedAlbum.title}</div>
// </div>
//       `);
  } catch (error) {
    return error;
  }
};

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    // let user = ev.target.getAttribute('data-value')
    // ev.dataTransfer.setData("user", user);
  }

  function drop(ev) {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("text");
    //   let userId = ev.dataTransfer.getData("user");
    //   let userId = ev.dataTransfer.getAttribute('data-value')
     let userId = ev.currentTarget.getAttribute('data-value')

     swapAlbum(userId, data)
    ev.currentTarget.appendChild(document.getElementById(data));
  }

// // Assign handlers immediately after making the request,
//         // and remember the jqxhr object for this request
//         const jqxhr = await $.get( `https://jsonplaceholder.typicode.com/users/${userId}`, ()=> {
//           alert( "success" );
//         })
//           .done(()=> {
//             alert( "second success" );
//           })
//           .fail(()=> {
//             alert( "error" );
//           })
//           .always(()=> {
//             alert( "finished" );
//           });

//         // Perform other work here ...

//         // Set another completion function for the request above
//         jqxhr.always(function() {
//           alert( "second finished" );
//         });
