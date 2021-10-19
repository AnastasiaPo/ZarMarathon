const $chat = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Steel Fans', 'Flying Blade', 'Bo Staff'],
    attack: function () {
        console.log(player1.name + ' Fight...')
    }
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Ice Daggers', 'Kori Blade'],
    attack: function () {
        console.log(player2.name + ' Fight...')
    }
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

function random() {
    return Math.ceil(Math.random() * 20)
}

function playerHp(playerObj) {
    const $playerLife = document.querySelector('.player'+ playerObj.player + ' .life');

    if(playerObj.hp > 0) {
        playerObj.hp -= random();
    } else {
        playerObj.hp = 0;
    }

    $playerLife.style.width = playerObj.hp + '%';

    if(playerObj.hp == 0) {
        $randomButton.disabled = true;
    }

    if(player1.hp == 0) {
        $chat.appendChild(playerWins(player2.name));
    } else if(player2.hp == 0) {
        $chat.appendChild(playerWins(player1.name));
    }

}

function playerWins(name) {
    const $winsTitle = createElement('div', 'winsTitle');
    $winsTitle.innerText = name + ' wins';

    return $winsTitle;
}

$randomButton.addEventListener('click', function () {
    playerHp(player1);
    playerHp(player2);
})

$chat.appendChild(createPlayer(player1));
$chat.appendChild(createPlayer(player2));
