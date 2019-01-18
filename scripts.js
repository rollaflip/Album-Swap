$(document).ready(() => {
  console.log('ready!');
});

const getUserById = async userId => {
  try {
    const user = await $.get(
      `https://jsonplaceholder.typicode.com/users/${userId}?`,
      data => {
        console.log(data.name);
      }
    );
  } catch (error) {
    return error;
  }
};
const getUserById = async userId => {
  try {
    const albumsByUser = await $.get(
      `https://jsonplaceholder.typicode.com/albums/?userId=${userId}?`,
      data => {
        console.log(data.name);
      }
    );
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
