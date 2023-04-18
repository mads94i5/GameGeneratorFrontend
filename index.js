import {handleHttpErrors, sanitizeStringWithTableRows} from "/utils.js"
import Card from '/Card.js';

const URLgame = "http://localhost:8080/api/game-idea"

  
  async function getGame(){
try{
    const game = await fetch(URLgame)
    .then(handleHttpErrors)
    console.log(game)
    const listGame = game.map(game => 
      `<li>Title: ${game.title}</li>
      <li>Description: ${game.description}</li>
      <li>Player type: ${game.player}</li>
      <li>Genre: ${game.genre}</li>`)
      .join("")
    const okList = sanitizeStringWithTableRows(listGame)
    document.getElementById("string-list").innerHTML = okList
    
    const gameWrapper = html.querySelector('#wrapper');


    const card = new Card({
        type: "primary",
        href: `#/member/reservations/${reservation.id}/show`,
        header: `${game.title}`,
        image: reservation.poster ? reservation.poster : `https://picsum.photos/200/2${reservation.id % 10}`,
        body: `<p><strong>Theater:</strong> ${reservation.theaterName}</p><p><strong>Show datetime:</strong> ${reservation.showDateTime}</p><p><strong>Seats:</strong> ${reservation.seatIds.toString().split(",").map(seat => `<span class="badge primary">${seat}</span>`).join('')}</p>`,
        footer: reservation.checkedIn ? '<small class="badge success">Checked in</small>' : '<small class="badge secondary">Not checked in</small>',
            animation: {
            onmouseenter: {
                type: "jello",
                duration: 1000
            },
        }
    })

    const simularGames = game.map(game =>
        `<div>
        const card = new Card({
            
        })
        </div>`)
/* 
        const reservationWrapper = html.querySelector('#wrapper');

                // Create a new card
                const card = new Card({
                    type: "primary",
                    href: `#/member/reservations/${reservation.id}/show`,
                    header: `${game.title}`,
                    image: reservation.poster ? reservation.poster : `https://picsum.photos/200/2${reservation.id % 10}`,
                    body: `<p><strong>Theater:</strong> ${reservation.theaterName}</p><p><strong>Show datetime:</strong> ${reservation.showDateTime}</p><p><strong>Seats:</strong> ${reservation.seatIds.toString().split(",").map(seat => `<span class="badge primary">${seat}</span>`).join('')}</p>`,
                    footer: reservation.checkedIn ? '<small class="badge success">Checked in</small>' : '<small class="badge secondary">Not checked in</small>',
                        animation: {
                        onmouseenter: {
                            type: "jello",
                            duration: 1000
                        },
                    }
                });

                reservationWrapper.appendChild(card); */


  } catch (err) {
    //Like this if you only need the "message"
console.log(err.message)
    //Like this if you need all properties from the error response

  }
    }