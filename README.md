Tracer Frontend Challenge
We are going to build a simple UI for swapping albums for two different users.


Setup
Everything you’ll need is included in the materials we’ve provided, and in the docs referenced below. Do not use any external packages/code/technology/frameworks/*, except jQuery, which we’ve already imported for you in the html file. It shouldn’t be necessary for you to create any new files, just edit the ones provided. You may edit them to your heart’s content. Please send back a zip file containing your submission.

You will be using JSONPlaceholder to mock API requests. Docs here: (www.jsonplaceholder.typicode.com)


Tasks
1. DISPLAY
Get users with ids 1 and 2, and their associated albums from the mock API. Using the provided template, display the response data in two tables representing each user.

2. DRAG AND DROP
Implement drag-and-drop. I should be able to drag a row from one table, and drop it into the other. Doing so should trigger an AJAX request, updating the userId property on the album. When the request resolves, you should utilize the data in the response to make the appropriate changes in the display. We want to make sure the UI is consistent with the data at all costs.
Note: The mock API will not actually persist anything you send to it.

3. TEXT SEARCH
Include a text input above each table that permits filtering albums by title. Filtering should cause only albums with titles that at least partially match the input to display in the table.

4. DESIGN
Update the design of the base template by candy-striping the rows in each table, highlighting rows on mouse-over, and styling the dropzone. Feel free to add any other design elements or flair that you feel enhances the user experience.

5. USER SWAPPING
Allow users to swap albums between any users that the API has access to.

6. DRAG AND DROP IN BULK
Allow users to select multiple rows, and drag them together in bulk. You’ll still have to make a PUT request for each one separately though.
