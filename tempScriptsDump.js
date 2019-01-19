//jquery put////

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


//Hard Code add/remove  /////
//   const tableToAdd = direction === 'left' ? '#user-1' : '#user-2';
//   const tableToRemove = direction === 'left' ? '#user-2' : '#user-1';
//   if (!receivingUserId > 0) throw new Error('User Id must be > 0');


//     $(`#${swappedAlbum.id}`).remove();
//     $(tableToAdd).append(`
//     <div class='table__row' id="${swappedAlbum.id}" draggable="true" ondragstart="drag(event) data-value="${user.id}"">
//     <div class='table__cell table__cell--short' >${swappedAlbum.id}</div>
//     <div class='table__cell table__cell'>${swappedAlbum.title}</div>
// </div>
//       `);




//   Error handling???////

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
