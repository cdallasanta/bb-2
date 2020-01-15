import {backyards} from '../images/allImages';

delete backyards["backyardCardBack.png"]

const backyardCards = Object.getOwnPropertyNames(backyards).map((filename, i) => {
  return {
    src: backyards[filename],
    type: filename.replace('.png','')
  };
});

export let initBackyardDeck;

// fill the array with 3 copies of each card
initBackyardDeck = new Array(30);
for(let i = 0; i < 10; i++){
  initBackyardDeck.fill(backyardCards[i], i*3, (i+1)*3)
}

// assign a unique id to each card
initBackyardDeck.forEach(function(card, index) {
  this[index] = Object.assign({}, card, {id: index});
}, initBackyardDeck);