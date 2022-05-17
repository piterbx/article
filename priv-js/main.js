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
const $postPreview = document.querySelector('.preview');
//popup
const $popup = document.querySelector('.popup');
const $popupBtnCancel = document.querySelector('.popupCancel');
const $popupBtnNext = document.querySelector('.popupNext');
let $showPopup = true;
let $input1;
let $input2;

// btns
const $infoBtn = document.querySelector('.previewBtn');
const $manualBtn = document.querySelector('.manualBtn');
const $cancelBtn = document.querySelector('.cancel');
const $submitBtn = document.querySelector('.submit');
const $imgAddBtn = document.querySelector('.add-img-btn');
const $linkAddBtn = document.querySelector('.add-link-btn');

// for createPost function
let $CRpost;
let $CRpostTitle;
let $CRpostContent;
let $CRcontentInfo;
let $CRcontentText;
let $CRcategory;
let $CRauthor;
let $CRdate;

document.addEventListener('DOMContentLoaded',()=>{
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

const createPostElements = () => {
    $CRpost = document.createElement('div');
    $CRpostTitle = document.createElement('h3');
    $CRpostContent = document.createElement('div');
    $CRcontentInfo = document.createElement('div');
    $CRcategory = document.createElement('p');
    $CRauthor = document.createElement('p');
    $CRdate = document.createElement('p');
    $CRcontentText = document.createElement('p');
    $CRpost.classList.add('post');
    $CRpostTitle.classList.add('post__title');
    $CRpostContent.classList.add('post__content');
    $CRcontentInfo.classList.add('post__info');
    $CRcategory.classList.add('c');
    $CRauthor.classList.add('a');
    $CRdate.classList.add('d');
    $CRcontentText.classList.add('post__text');
    $CRcontentInfo.appendChild($CRcategory);
    $CRcontentInfo.appendChild($CRauthor);
    $CRcontentInfo.appendChild($CRdate);
    $CRpostContent.appendChild($CRcontentInfo);
    $CRpostContent.appendChild($CRcontentText);
    $CRpost.appendChild($CRpostTitle);
    $CRpost.appendChild($CRpostContent);
};

const addPostContent = () => {
    $CRpostTitle.innerText = $postTitle.value;
    $CRcontentText.innerText = $postContent.value;
    $CRcategory.innerHTML = `<span>Category:</span> ${$categoryBox.value}`;
    $CRauthor.innerHTML = `<span>Author:</span> ${$authorBox.innerText}`;
    $CRdate.innerHTML = `<span>Date:</span> ${$timeBox.innerText}`;
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
    addPostContent();
};

const checkTextArea = () => {
    if($postContent.value!=='' && $postTitle.value!==''){
        createNewPost();
        popup('gosubmit')
    } else {
        popup('checksubmit');
    };
};


const showPreview = () => {
    $postPreview.classList.toggle('show-preview');
    updatePreview();
    window.scrollTo({
        top: 800,
        left: 0,
        behavior: 'smooth'
    });
};

const updatePreview = () => {
    createPostElements();
    addPostContent();
    $postPreview.innerHTML = '<h2>Preview</h2>';
    $postPreview.appendChild($CRpost);

    if($postTitle.value==''){
        $CRpostTitle.innerText = '[add some text]';
    } else {
        $CRpostTitle.innerText = $postTitle.value;
    };

    if($postContent.value==''){
        $CRcontentText.innerText = '[add some text]';
    } else {
        $CRcontentText.innerHTML = $postContent.value;
    };
};

const showMobilePreview = () => {
    if(window.innerWidth <= 435){
        $postPreview.classList.add('show-preview');
        updatePreview();
        $infoBtn.style.display = 'none';
        $manualBtn.style.display = 'none';
        if($showPopup==true){
            popup('manual');
            $showPopup = false;
        };
    } else {
        $postPreview.classList.remove('show-preview');
        $infoBtn.style.display = 'flex';
        $manualBtn.style.display = 'flex';
        $showPopup = true;
    };
};

const checkPopupInputs = choice => {
    $input1 = $popup.querySelector('input:first-of-type');
    $input2 = $popup.querySelector('input:last-of-type');
    if($input1.value!=='' && $input2.value!==''){
        switch(choice) {
            case 'img':
                $postContent.value += `<!--image code--><img src="${$input1.value}" alt="${$input2.value}"/>`;
                break;
            case 'link':
                $postContent.value += `<!--link code--><a href="${$input1.value}">${$input2.value}</a>`;
                break;
            default:
        };
        closePopup();
        $input1.value = '';
        $input2.value = '';
    } else {
        $input1.classList.add('required');
        $input2.classList.add('required');
    };
};

const closePopup = () => {
    document.body.classList.remove('overflow');
    $popup.classList.remove('show-popup');
};

const popup = (nextStep) => {
    document.body.classList.add('overflow');
    $popup.classList.add('show-popup');

    const title = $popup.querySelector('.popupTitle');
    const mess = $popup.querySelector('.popupMs');
    const content = $popup.querySelector('.popupContent');

    const cancelBtnMakeHidden = () => {
        $popupBtnCancel.style.display = 'none';
            $popupBtnNext.addEventListener('click', () => {
                $popupBtnCancel.style.display = 'block';
                closePopup()
            });
    };

    switch(nextStep){
        case 'addImg':
                title.innerText = 'Add image';
                mess.innerText = 'To add img paste your link below and add alternative text.';
                content.innerHTML = '<input type="text" placeholder="Add link here" required><input type="text" placeholder="Add text here" required>';
                $popupBtnNext.onclick = () => checkPopupInputs('img');
            break;
        case 'addLink':
                title.innerText = 'Add link';
                mess.innerText = 'To add link paste correct URL below and add text.';
                content.innerHTML = '<input type="text" placeholder="Add URL here" required><input type="text" placeholder="Add linkname here" required>';
                $popupBtnNext.onclick = () => checkPopupInputs('link');
            break;
        case 'cancel':
            title.innerText = 'Confirm Cancel';
            mess.innerText = 'Are you sure?';
            content.innerHTML = '';
            $popupBtnNext.onclick = () => {
                closePopup();
                window.location.href = '';
            };
            break;
        case 'checksubmit':
            title.innerText = 'Empty area';
            mess.innerText = 'Add some text first ;)';
            content.innerHTML = '';
            cancelBtnMakeHidden();
            $popupBtnNext.onclick = () => {
                if($postContent.value==='' && $postTitle.value===''){
                    $postTitle.classList.add('required');
                    $postContent.classList.add('required');
                } else if($postContent.value===''){
                    $postContent.classList.add('required');
                } else if($postTitle.value===''){
                    $postTitle.classList.add('required');
                };
            };
            break;
        case 'manual':
            title.innerText = 'Manual';
            mess.innerText = '1.To add enter use <br> \n 2.To add link click button in top right corner \n 3.To add image click button in top right corner \n 4.Text areas cannot be empty😉';
            content.innerHTML = '';
            cancelBtnMakeHidden();
            break;
        case 'gosubmit':
            title.innerText = 'Your post has been submitted';
            mess.innerText = 'Good Job!';
            cancelBtnMakeHidden();
            break;
        default:
            return 0;
    };
};

// all events
setTime();
showMobilePreview(); 
$cancelBtn.addEventListener('click', ()=>popup('cancel'));
$submitBtn.addEventListener('click', checkTextArea);
$infoBtn.addEventListener('click', showPreview);
$manualBtn.addEventListener('click', () => {popup('manual')});
$postTitle.addEventListener('keyup', updatePreview);
$postContent.addEventListener('keyup', updatePreview);
$categoryBox.addEventListener('change', updatePreview);
$postTitle.addEventListener('keyup', ()=>$postTitle.classList.remove('required'));
$postContent.addEventListener('keyup', ()=>$postContent.classList.remove('required'));
window.addEventListener('resize', showMobilePreview);
$imgAddBtn.addEventListener('click', ()=>popup('addImg'));
$linkAddBtn.addEventListener('click', ()=>popup('addLink'));
$popupBtnCancel.addEventListener('click', closePopup);
});