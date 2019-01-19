$(document).ready(function() {
  console.log('ready!');
  getAlbumsByUserId(1,'left')
  getAlbumsByUserId(2,'right')
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
  const whichTable = (direction === 'left') ?"#user-1" : "#user-2"
  if (!userId > 0) throw new Error('User Id must be > 0');
  try {
    const albums = await $.get(`${url}?userId=${userId}`)
    // .fail(()=> {alert( "error" )});
    console.log(albums)
    albums.map(album =>{
        $(whichTable).append(`
        <div class='table__row'>
            <div class='table__cell table__cell--short' id="${album.id}">${album.id}</div>
            <div class='table__cell table__cell'>${album.title}</div>
        </div>
        `);
    })

  } catch (error) {
    return error;
  }
};

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
