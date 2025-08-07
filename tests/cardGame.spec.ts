import { test, expect} from '@playwright/test'
import { request } from 'http'

test('card game' , async({request})=> {

    const url = 'https://deckofcardsapi.com/api/deck/new/';
    const deckRes = await request.get(url);
   expect(deckRes.ok()).toBeTruthy();

     const deckData = await deckRes.json();
     const deckId = deckData.deck_id;
     console.log('Deck ID:', deckId);

     const shuffleRes = await request.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    expect(shuffleRes.ok()).toBeTruthy();
     const shuffleResponse = await shuffleRes.json();
     expect(shuffleResponse.deck_id).toBe(deckId);
     

     const drawRes = await request.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`);
     const drawData = await drawRes.json();
     const cards = drawData.cards;
      const player1 = cards.slice(0, 3);
      const player2 = cards.slice(3, 6);

      function getScore(cardScore) {
  let sum = 0;

  for (let i = 0; i < cardScore.length; i++) {
    let cardValue = cardScore[i].value;

    if (cardValue === 'KING' || cardValue === 'QUEEN' || cardValue === 'JACK') {
      sum += 10;
    } else if (cardValue === 'ACE') {
      sum += 11;
     }
  }

  return sum;
}

const p1Score = getScore(player1);
const p2Score = getScore(player2);

console.log("Player 1 Totalscore is: " + p1Score);
console.log("Player 2 Totalscore is : " + p2Score);

if (p1Score === 21 && p2Score === 21) {
  console.log("Both players have Blackjack!");
} else if (p1Score === 21) {
  console.log("Player 1 has Blackjack!");
} else if (p2Score === 21) {
  console.log("Player 2 has Blackjack!");
} else {
  console.log("No Blackjack.");
}
})