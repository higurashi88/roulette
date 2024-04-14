let context = [
    "最近見た映画",
    "きのこ派？たけのこ派?",
    "おすすめの家電",
    "犬派？猫派？",
    "地元自慢！",
    "楽しかった旅行先",
    "おすすめの暇つぶしグッズ",
    "ちょっとだけ自慢できること",
    "おすすめアニメ",
    "推しのプレゼン",
    "一番高かった買い物",
    "一番満足した雑貨",
    "行きたい場所"];

// がめんが読み込まれたときに実行される
window.onload = function () {
    changeCulum();
    // culumクラス内のinput要素を取得
    let culum = document.querySelectorAll('.culum');
    // input要素にランダムな値を入れる
    for (let i = 0; i < culum.length; i++) {
        culum[i].value = context[Math.floor(Math.random() * context.length)];
        // inputに入れた値をリストから削除
        context.splice(context.indexOf(culum[i].value), 1);
    }
}

// id="number"のinput要素を取得
let number = document.getElementById('number');

// class="item"の要素を取得
let boxes = document.querySelectorAll('.item');

// 回る間隔
let span = 100;
let stop_interval = 0;

// 現在のインデックス
let currentIndex = 0;

number.addEventListener('change', function () {
    changeCulum();
});

function changeCulum() {
    let roulette_area = document.querySelector('.roulette_area');
    let item = document.querySelectorAll('.item');
    let num = number.value;
    let time = 0;
    let is_start = false;
    if (num > item.length) {
        for (let i = item.length; i < num; i++) {
            let div = document.createElement('div');
            div.classList.add('item');
            let input = document.createElement('input');
            input.classList.add('culum');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', '項目' + (i + 1));
            // inputのvalueにcontextの中身をランダムに入れる
            input.value = context[Math.floor(Math.random() * context.length)];
            // inputに入れた値をリストから削除
            context.splice(context.indexOf(input.value), 1);
            div.appendChild(input);
            roulette_area.appendChild(div);
        }
    } else if (num < item.length) {
        for (let i = item.length - 1; i >= num; i--) {
            roulette_area.removeChild(item[i]);
        }
    }
}


// ルーレットをハイライトする
function highlightBox() {
    const rouletteId = setTimeout(() => {
        boxes[currentIndex].classList.remove('highlight');
        currentIndex = (currentIndex + 1) % boxes.length;
        boxes[currentIndex].classList.add('highlight');
        if (is_start) {
            highlightBox();
        }
    }, span);
}

// ルーレットを開始する
function startRoulette() {
    time = 0;
    boxes = document.querySelectorAll('.item');
    document.getElementById('start').disabled = true;
    is_start = true;
    highlightBox();
}

// ルーレットを停止する
function stopRoulette() {
    //stop_intervalミリ秒だけ待ってからルーレットを停止する
    stop_interval = Math.floor(Math.random() * 2000) + 750;
    span = 250;
    setTimeout(() => {
        is_start = false;
        document.getElementById('start').disabled = false;
    }, stop_interval);

}

// ルーレットをリセットする
function resetRoulette() {
    location.reload();
}

