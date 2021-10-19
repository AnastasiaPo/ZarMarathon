const $chat = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $reloadBtn = createElement('div', 'reloadWrap');

const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Steel Fans', 'Flying Blade', 'Bo Staff'],
    attack: function () {
        console.log(player1.name + ' Fight...')
    },
    changeHp: changeHp,
    renderHp: renderHp,
    elHp: elHp
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Ice Daggers', 'Kori Blade'],
    attack: function () {
        console.log(player2.name + ' Fight...')
    },
    changeHp: changeHp,
    renderHp: renderHp,
    elHp: elHp
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);

    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);

    return $player;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num)
}

function changeHp(hit) {
    if(this.hp > hit) {
        this.hp -= hit;
    } else {
        this.hp = 0;
    }
}

function elHp() {
    const $playerLife =  document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
}

function renderHp() {
    this.elHp().style.width = this.hp + '%';
}

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');

    if(name) {
        $winsTitle.innerText = name + ' wins';
    } else {
        $winsTitle.innerText = 'draw';
    }

    return $winsTitle;
}

function createReloadButton() {
    const $btn = createElement('button', 'button');

    $btn.innerText = 'Restart';
    $reloadBtn.appendChild($btn);
    $chat.appendChild($reloadBtn);
}

$reloadBtn.addEventListener('click', function () {
    window.location.reload();
})

$randomButton.addEventListener('click', function () {
    player1.changeHp(getRandom(20));
    player1.renderHp();
    player2.changeHp(getRandom(20));
    player2.renderHp()


    if(player1.hp == 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $chat.appendChild(playerWins(player2.name));
    } else if(player2.hp === 0 && player2.hp < player1.hp) {
        $chat.appendChild(playerWins(player1.name));
    } else if(player1.hp === 0 && player2.hp === 0) {
        $chat.appendChild(playerWins());
    }
})

$chat.appendChild(createPlayer(player1));
$chat.appendChild(createPlayer(player2));
