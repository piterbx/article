function Post(title, category, comments, author, time, postContent) {
    title: this.title;
    category: this.category;
    comments: this.comments;
    author: this.author;
    time: this.time;
    postContent: this.postContent;
};

const $newPost = new Post();

// all elements
const $categoryBox = document.getElementById('category');
const $commentsBox = document.querySelector('#allowComments');
const $authorBox = document.querySelector('.author');
const $timeBox = document.querySelector('.timebox');
const $postContent = document.querySelector('textarea');
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

const updateCategory = () => {
    console.log($categoryBox.value);
};

const updateCommentsOption = () => {
    console.log($commentsBox.value);
};

// all events
setTime();
$categoryBox.addEventListener('change', updateCategory);
$commentsBox.addEventListener('change', updateCommentsOption);