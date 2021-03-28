
const postHandler = async (event) => {
    event.preventDefault();

    const post = document.querySelector('#postText').value.trim();
    const title = document.querySelector('#postTitle').value.trim();

    if (post) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, post }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};


const commentHandler = async (event) => {
    event.preventDefault();

    const getCurrentUrlPost_id = window.location.href.split('/')
    [window.location.href.toString().split('/').length - 1];
    const comment = document.querySelector('#commentText').value.trim();
    if (comment) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ getCurrentUrlPost_id, comment, }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

const editPostHandler = async (event) => {
    event.preventDefault();
    const getCurrentUrlPost_id = window.location.href.split('/')
    [window.location.href.toString().split('/').length - 1];
    const editTitle = document.querySelector('input[name="title"]').value;
    const editPost = document.querySelector('textarea[name="description"]').value;
    if (editPost && editTitle) {
        const response = await fetch(`/api/posts/${getCurrentUrlPost_id}`, {
            method: 'PUT',
            body: JSON.stringify({ editTitle, editPost }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

const deletePostHandler = async (event) => {
    event.preventDefault();
    const getId = document.querySelector('button[name="postId"]').value.trim();
    const response = await fetch(`/api/posts/${getId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

let post = document.querySelector('.post-form');

let comment = document.querySelector('.comment-form');

let editPost = document.querySelector('.edit-form');

let deletePost = document.querySelector('.delete-form');

if (post)
    post.addEventListener('submit', postHandler, false);

if (comment)
    comment.addEventListener('submit', commentHandler, false);

if (editPost)
    editPost.addEventListener('submit', editPostHandler, false);

if (deletePost)
    deletePost.addEventListener('submit', deletePostHandler, false);