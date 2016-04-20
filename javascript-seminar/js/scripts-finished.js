// Set user's name to John Harvard
var name = "John Harvard";

// Function for submitting post
function submitPost() {
  // Get the textarea containing the post text
  var postText = document.getElementById("compose-post")
  var postContent = postText.value.trim();
  var reallyPost = confirm("Really post: " + postContent + "?");
  // If the textarea actually contains words
  // We could check postText.value != "" but that would allow a post of all spaces
  // .trim() gets rid of whitespace, so any post that's all spaces will get trimmed to nothing
  if(reallyPost && postContent != "") {
    // Use the post template function to get the HTML of the new post
    // Then append that HTML to the "main" div
    document.getElementById("main").innerHTML += postTemplate(postContent);
    // Clear the post text area
    postText.value = ""
  }
}

// HTML template for a post, where given the post's content, HTML is generated for the post
function postTemplate(text) {
  // The same HTML as the example post, but no comments are present,
  // the name is pulled from the preset variable, and the text is pulled from the provided argument
  return ' \
  <div class="post"> \
    <div class="content-area"> \
      <h4>' + name + '</h4> \
      <p>' + text + '</p> \
    </div> \
    <div class="comment-area"> \
      <div class="comments"> \
      </div> \
      <input class="compose-comment" placeholder="Write a comment..." onkeydown="commentKeyDown(event)"></input> \
    </div> \
  </div> \
  ';
}

// A function that runs every time a key is pressed a key is pressed in a comment box
// This is so that we can detect pressing enter
function commentKeyDown(event) {
  // The event is a special javascript object. The most important properties now are the
  // keycode, where 13 denotes pressing "enter", and the target, which is the HTML
  // element triggering the event

  // event.keyCode == 13 checks that the event is the result of pressing enter
  if(event.keyCode == 13) {
    // We run the addComment function, supplying the comment box element where enter was pressed
    addComment(event.target)
  }
}

// A function that attempts to add a comment to the comment area corresponding to a specified comment box
function addComment(textbox) {
  // Similarly to posts, checks that there is in fact a nontrivial comment to add
  if(textbox.value.trim() != "") {
    // This line is tricky. Basically, .parentNode means the HTML element containing the one specified.
    // If you check the HTML, this is a <div class="comment-area">. That div has two children: a
    // <div class="comments"> (which contains some <div class="comment"> elements) and the comment box.
    // To access the <div class="comments">, we take the first (0th) child of the <div class="comment-area">.
    // So we go one level up from the comment box, look at that element's two children, and dive into the first one.
    var commentArea = textbox.parentNode.children[0]
    // Similarly to earlier, we append a templated comment HTML to the comment area and clear the comment box.
    commentArea.innerHTML += commentTemplate(textbox.value)
    textbox.value = ""
  }
}

// HTML template for a comment, where given the comment's content, HTML is generated for the post
// Works identically to the previous template function
function commentTemplate(text) {
  return ' \
  <div class="comment"> \
    <h5>' + name + '</h5> \
    ' + text + ' \
  </div> \
  '
}

function showGitUrl() {
  alert("http://git.patrickpan.com/patrick/cs50hbs.git")
}
