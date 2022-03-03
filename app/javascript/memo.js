const buildHTML = (XHR) => {
  const item = XHR.response.post;//postはrender json: {post: post}の前の方のキーとしてのpost
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post() {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.getElementById('form')
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById('content');
      list.insertAdjacentHTML("afterend", buildHTML);
      formText.value = '';
    };
  });
};

window.addEventListener('load', post);
