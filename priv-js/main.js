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

// for createPost function
let $CRpost;
let $CRpostTitle;
let $CRpostContent;
let $CRcontentInfo;
let $CRcontentTe;
let $CRcontentImg;

// all functions
const setTime = () => {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth()+1;
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

const createPostElements = () => {
    $CRpost = document.createElement('div');
    $CRpostTitle = document.createElement('h3');
    $CRpostContent = document.createElement('div');
    $CRcontentInfo = document.createElement('div');
    $CRcontentText = document.createElement('p');
    $CRcontentImg = document.createElement('img');
    $CRpost.classList.add('post');
    $CRpostTitle.classList.add('post__title');
    $CRpostContent.classList.add('post__content');
    $CRcontentInfo.classList.add('post__info');
    $CRcontentText.classList.add('post__text');
    $CRcontentImg.classList.add('post__img');
    $CRpostContent.appendChild($CRcontentInfo);
    $CRpostContent.appendChild($CRcontentText);
    $CRpostContent.appendChild($CRcontentImg);
    $CRpost.appendChild($CRpostTitle);
    $CRpost.appendChild($CRpostContent);
    // <div class="post">
    //                     <h3 class="post__title">Post Title</h3>
    //                     <div class="post__content">
    //                         <div class="post__info">
    //                             <p><span>Category:</span> General</p>
    //                             <p><span>Author:</span> Paul</p>
    //                             <p><span>Date:</span> 23:32:22 22/03/2021</p>
    //                         </div>
    //                         <p class="post__text">Hello there! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, vero sapiente neque quidem nihil quas voluptatum esse sed obcaecati consectetur ab repellat, blanditiis maxime architecto consequuntur iste cumque assumenda tenetur.</p>
    //                         <img src="https://cdn.pixabay.com/photo/2021/03/12/21/25/keys-6090560__340.jpg"/>
    //                     </div>
    //                 </div>
    addPostContent();
};

const addPostContent = () => {
    console.log($CRpost);
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
    createPostElements();
    // addPostContent();
};

const checkTextArea = () => {
    if($postContent.value!=='' && $postTitle.value!==''){
        createNewPost();
    } else {
        alert('Add some text ;)');
    };
};


const showPreview = () => {
    $postPreview.classList.toggle('show-preview');
    updatePreview();
};

const updatePreview = () => {
    createPostElements();
    // if($postTitle.value=='' && $postContent.value==''){
    //     title.innerText = '[add some text]';
    //     div.innerText = '[add some text]';
    // } else {
    //     title.innerText = $postTitle.value;
    //     div.innerHTML = $postContent.value;
    // };

    // if($postTitle.value==''){
    //     title.innerText = '[add some text]';
    // };

    // if($postContent.value==''){
    //     title.innerText = '[add some text]';
    // };
};

const showMobilePreview = () => {
    if(window.innerWidth <= 435){
        $postPreview.classList.add('show-preview');
        updatePreview();
        $infoBtn.style.display = 'none';
    } else {
        $postPreview.classList.remove('show-preview');
        $infoBtn.style.display = 'flex';
    };
};

// all events
setTime();
$cancelBtn.addEventListener('click', cancelConfirm);
$submitBtn.addEventListener('click', checkTextArea);
$infoBtn.addEventListener('click', showPreview);
$postTitle.addEventListener('keyup', updatePreview);
$postContent.addEventListener('keyup', updatePreview);
window.addEventListener('resize', showMobilePreview);
document.addEventListener('DOMContentLoaded', showMobilePreview);