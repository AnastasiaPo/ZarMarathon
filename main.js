const player1 = {
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Steel Fans', 'Flying Blade', 'Bo Staff'],
    attack: function () {
        console.log(player1.name + ' Fight...')
    }
}

const player2 = {
    name: 'Subzero',
    hp: 95,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice Scepter', 'Ice Daggers', 'Kori Blade'],
    attack: function () {
        console.log(player2.name + ' Fight...')
    }
}

function createPlayer(playerClass, player) {
    const $player1 = document.createElement('div');
    $player1.classList.add(playerClass);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp + '%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $img = document.createElement('img');
    $img.src = player.img;

    $player1.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player1.appendChild($character);
    $character.appendChild($img);

    const $chat = document.querySelector('.arenas');
    $chat.appendChild($player1);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
