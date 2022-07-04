const username = document.getElementById("username");
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//Initialises empty highscores array
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;



username.addEventListener('keyup', ()=> {
    //validation if nothing inthere disable save button
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log('clicked the save button!');
    e.preventDefault();

        const score = {
            score: mostRecentScore,
            name: username.value
        };
        highScores.push(score);

        //sorted array of top scores
        highScores.sort( (a,b) => b.score - a.score)
        //Maintains top 5 only
        highScores.splice(5);

        //Now top score stays in console!
        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.assign('./index.html');
        console.log(highScores);
}




