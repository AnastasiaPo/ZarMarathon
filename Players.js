import { heroAttack } from './GamesAction.js';

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.heroAttack = heroAttack;
        this.changeHP = changeHP;
        this.renderHP = renderHP;
        this.elHP = elHP;
    }
}

const player1 = new Player({
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Steel Fans', 'Flying Blade', 'Bo Staff']
});

const player2 = new Player({
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: ['Steel Fans', 'Flying Blade', 'Bo Staff']
});

function changeHP(damage) {
    this.hp > damage ? (this.hp -= damage) : (this.hp = 0);
}
function elHP() {
    const $elLife = document.querySelector('.player' + this.player + ' .life');
    return $elLife;
}
function renderHP() {
    elHP().style.width = this.hp + '%';
}
function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}
function getDamage(player, damage) {
    player.changeHP(damage);
    player.renderHP();
}
function createPlayer(person) {
    const { player, hp, name, img } = person;

    const $player = createElement('div', 'player' + player),
        $progressbar = createElement('div', 'progressbar'),
        $life = createElement('div', 'life'),
        $name = createElement('div', 'name'),
        $character = createElement('div', 'character'),
        $img = createElement('img');

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);

    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;

    return $player;
}
export { createElement, getDamage, createPlayer, player1, player2 };