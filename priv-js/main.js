function Post(title, category, comments, author, time, postContent) {
    title: this.title;
    category: this.category;
    comments: this.comments;
    author: this.author;
    time: this.time;
    postContent: this.postContent;
};

let $newPost;

// all elements
const $categoryBox = document.getElementById('category');
const $commentsBox = document.querySelector('#allowComments');
const $authorBox = document.querySelector('.author');
const $timeBox = document.querySelector('.timebox');
const $postTitle = document.querySelector('#newPostTitle');
const $postContent = document.querySelector('#newPostContent');
const $postPreview = document.querySelector('.creator__preview');
// btns
const $infoBtn = document.querySelector('.creator__btn--info');
const $cancelBtn = document.querySelector('.cancel');
const $submitBtn = document.querySelector('.submit');

// all functions
const setTime = () => {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();

    if(h<10){
        h = `0${h}`;
    };
    if(m<10){
        m = `0${m}`;
    };
    if(s<10){
        s = `0${s}`;
    };
    if(day<10){
        day = `0${day}`;
    };
    if(month<10){
        month = `0${month}`;
    };

    $timeBox.innerText = `${h}:${m}:${s} ${day}/${month}/${year}`;

    setTimeout(setTime, 1000);
};

const cancelConfirm = () => {
    const decision = confirm('Are you sure?');
    if(decision){
        window.location.href = 'index.html';
    };
};

const createNewPost = () => {
    $newPost = new Post();
    $newPost.title = $postTitle.value;
    $newPost.category = $categoryBox.value;
    $newPost.comments = $commentsBox.value;
    $newPost.author = $authorBox.innerText;
    $newPost.time = $timeBox.innerText;
    $newPost.postContent = $postContent.value;

    console.log($newPost);
};

const checkTextArea = () => {
    if($postContent.value!=='' && $postTitle.value!==''){
        createNewPost();
    } else {
        alert('Add some text ;)');
    };
};

const checkModifiedText = () => {
    let $modifiedText = $postContent.value;
    // if($modifiedText.indexOf(''))
};

const showPreview = () => {
    $postPreview.classList.toggle('show-preview');
    updatePreview();
};

const updatePreview = () => {
    const h3 = $postPreview.querySelector('h3');
    const p = $postPreview.querySelector('p');

    if($postTitle.value=='' && $postContent.value==''){
        h3.innerText = '[add some text]';
        p.innerText = '[add some text]';
    } else {
        h3.innerText = $postTitle.value;
        p.innerText = $postContent.value;
        checkModifiedText();
    };

    if($postTitle.value==''){
        h3.innerText = '[add some text]';
    };

    if($postContent.value==''){
        p.innerText = '[add some text]';
    };
};

// all events
setTime();
$cancelBtn.addEventListener('click', cancelConfirm);
$submitBtn.addEventListener('click', checkTextArea);
$infoBtn.addEventListener('click', showPreview);
$postTitle.addEventListener('keyup', updatePreview);
$postContent.addEventListener('keyup', updatePreview);