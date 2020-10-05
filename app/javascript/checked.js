function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    post.addEventListener("click", () => {
      if (post.getAttribute("data-load") != null) { //1秒毎の更新を制御するif文
        return null;
      }
      post.setAttribute("data-load", "true");
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest(); //ここでXMLHttpRequestを「XHR」に代入
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) { //レスポンスのステータスコードを確認
          alert(`Error ${XHR.status}: ${XHR.statusText}`); //200以外（正常以外）はアラート
          return null;  //returnメソッドは値をそのまま返すのでnullを返す
        }
        const item = XHR.response.post; //コントローラーのrenderのキー
        if (item.checked === true) {
          post.setAttribute("data-check", "true"); //HTMLのdata-cheakにtrueを代入
        } else if (item.checked === false) {
          post.removeAttribute("data-check"); //HTMLのdata-chakeを削除
        }
      };
    });
  });
}
// window.addEventListener("load", check); //ウインドウを読み込んだ際に実行
setInterval(check, 1000); //1000ミリ秒事に実行
