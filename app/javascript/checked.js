// checkという名前で関数を定義しましょう。
// DOMの取得からエンドポイントへのリクエストなどは、すべてこのcheck関数へ記述することにします。
// window.addEventListener("load", check);で、window（ページ）をload（読み込み）した時に実行します。

function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function(post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      // ここにクリックした時に行う「何らかの処理」を記述していく
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open ("GET", `/posts／${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
   });
}
setInterval(check, 1000);