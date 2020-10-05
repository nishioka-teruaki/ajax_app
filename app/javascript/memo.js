function memo() {}// memo関数を設定
  const submit = document.getElementById("submit");// 投稿するボタンの情報を取得
  submit.addEventListener("click", (e) => {// 投稿するボタンをクリックした場合に実行する関数を定義
    const formData = new FormData(document.getElementById("form"));// フォームのデータを取得
    const XHR = new XMLHttpRequest();// XMLHttpRequestをXHRに代入
    XHR.open("POST", "/posts", true);// POSTアクションをリクエスト
    XHR.responseType = "json";// JSONデータを戻す
    XHR.send(formData);// フォームデータのリクエストを送る
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
window.addEventListener("load", memo);// ページ読み込み時に実行
