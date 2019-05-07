# cssの種類による違い

```
div.root { height: 100vh; }
```

```
body { width: 100%; }
div.root { height: 100%; }
```

# 調査対象
// div.root の offsetHeight、clientHeight、scrollHeight ( width も同様に )

// iOS Safari, iOS Chrome, Android Chrome, Android Browser それぞれにおけるアドレスバー表示時、非表示時、文字入力フォーム表示時

// 純粋なスクリーンの画面サイズ ( デバイスの向きに関係なく、縦位置のときのwidth, heightを取得 )
screen.width
screen.height


// 有効画面サイズ  (PCでもスマホでも screen.height/width と同じ値だった)
screen.availWidth
screen.availHeight

// ウインドウサイズ ( iPhoneのみ 0 になった。PCだとinnerより少し大きい。影など？)
window.outerWidth
window.outerHeight


// ウインドウ内表示領域サイズ  ( 以下3つのheightは、スマホだとURLバーの表示の有無で変動します。(*1)を参照してください。 )
window.innerWidth    // <- PCだとスクロールバーの横幅を含む
window.innerHeight   // <- PCではブックマークバーなどを除いた高さ

document.documentElement.clientWidth
document.documentElement.clientHeight