const plusIcon = document.querySelector('#plus');
const postForm = document.querySelector('.createPost');
const closeIcon = document.querySelector('#close');
const closeIcon2 = document.querySelector('#close2');
const container = document.querySelector('.posts');
const title = document.querySelector('.userName');
const image = document.querySelector('.image');
const caption = document.querySelector('.caption');
const publicherInfo = document.querySelector('.publicherInfo');
const posts = document.querySelector('.posts');
const useridText = document.querySelector('.id');
const form = document.querySelector('#form');
const addBtn = document.querySelector('.addPost');
const commentForm=document.querySelector('#commentForm')
const commentsContent =document.querySelector('.commentsContent')
const commentSection= document.querySelector('.commentSection')




const getAllComments=()=>{
  commentSection.style.display = 'flex';
  getUser2('/getCommit').then((data) =>mapComments(data)).catch((err) => console.log(err.message));
  
}
const mapComments = (arr) => {
  arr.map((comment) => {
    console.log(comment)
    renderComment(comment);
  });
}
const passData = (commentInfo) => {
  let value =commentInfo.comment.value;
  let user_id=localStorage.getItem('user_id');
  let post_id='1'

  addUser({
    value, user_id, post_id
  }, 'POST', '/addCommit')
    .then((data) => {
    
      renderComment(data[0]);
    })
    .catch((err) => console.log(err));
  
}



commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const postInfo = e.target;
  passData(postInfo);
});
const renderComment=(comment=>{
  console.log(comment)
 
  const commentDev=document.createElement('div')
  commentDev.className="comment"
  const userImage = document.createElement('img');
  userImage.src='./assets/users.jpeg';
  const userName = document.createElement('p');
  userName.id='userNmaeComent';
  userName.textContent='farah'
  const commentText = document.createElement('p');
  commentText.id="value"
  console.log('the value',comment.content)
  commentText.textContent=comment.content;
  commentDev.append(userImage,userName,commentText)
  commentsContent.append(commentDev)

})



const renderPost = ((obj) => {
  const post = document.createElement('div');
  post.setAttribute('data-userid', obj.id);
  post.className = 'post';

  const headerPost = document.createElement('div');
  headerPost.className = 'headerPost';
  const publicherInfo = document.createElement('div');
  publicherInfo.className = 'publicherInfo';
  const userImage = document.createElement('img');
  userImage.src = './assets/users.jpeg';
  const title = document.createElement('p');
  title.className = 'userName';
  title.textContent = obj.title;
  publicherInfo.appendChild(userImage);
  publicherInfo.appendChild(title);
  const icon = document.createElement('div');
  icon.className = 'icon';
  const ellipsisIcon = document.createElement('i');
  ellipsisIcon.className = 'fa fa-ellipsis-v';
  icon.append(ellipsisIcon);
  headerPost.append(publicherInfo);
  headerPost.append(icon);

  const content = document.createElement('div');
  content.className = 'contant';

  const image = document.createElement('img');
  image.className = 'img';
  image.src = obj.image_url;
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  ul.className = 'icons';
  const li1 = document.createElement('li');
  const heartIcon = document.createElement('i');
  heartIcon.className = 'fa fa-heart';
  li1.append(heartIcon);
  const li2 = document.createElement('li');
  const commentIcon = document.createElement('i');
  commentIcon.className = 'fa fa-comments-o';
  li2.append(commentIcon);
  ul.append(li1, li2);
  div.append(ul);
  const div2 = document.createElement('div');
  const caption = document.createElement('p');
  caption.className = 'caption';
  caption.textContent = obj.content;
  content.append(image, div, div2);

  div2.append(caption);
  post.append(headerPost, content);
  posts.append(post);
  commentIcon.addEventListener('click',getAllComments)
});



const passDataToFetch = (postInfo) => {
  const username = postInfo.username.value;
  const url = postInfo.url.value;
  const content = postInfo.post.value;
  const id = localStorage.getItem('user_id');

  addUser({
    username, url, content, id,
  }, 'POST', '/addPost')
    .then((data) => {
      renderPost(data[0]);
    })
    .catch((err) => console.log(err));
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const postInfo = e.target;
  passDataToFetch(postInfo);
});

window.onload = () => {
  getUser('/getPosts').then((data) => mapPosts(data)).catch((err) => alert(err.message));
};

useridText.value = localStorage.getItem('user_id');
const mapPosts = (arr) => {
  arr.map((post) => {
    renderPost(post);
  });
  const headerPost = document.querySelectorAll('.headerPost');
  headerPost.forEach((element) => {
    element.addEventListener('click', (e) => {
      console.log(e.currentTarget.parentElement.dataset.userid);
    });
  });
};

plusIcon.addEventListener('click', () => {
  postForm.style.display = 'flex';
  container.style.opacity = 0.2;
  plusIcon.style.color = '#000';
});
addBtn.addEventListener('click', () => {
  postForm.style.display = 'none';
  container.style.opacity = 1;
  plusIcon.style.color = 'rgb(98, 98, 192)';
});

closeIcon.addEventListener('click', () => {
  postForm.style.display = 'none';
  container.style.opacity = 1;
  plusIcon.style.color = 'rgb(98, 98, 192)';
});

closeIcon2.addEventListener('click', () => {
  commentSection.style.display = 'none';
  container.style.opacity = 1;
 
});


document.querySelector('.fa-user').addEventListener('click', () => {
  window.location.href = '/profile';
});

fetch(`/user-info/${localStorage.getItem('user_id')}`)
  .then((res) => res.json())
  .then((data) => {
    document.querySelector('.welcome').textContent = `Welcome ${data.username}`;
  })
  .catch((err) => console.log(err.message));



