const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


highScoresList.innerHTML =
//here I use map to convert an array of locally stored highscores and turn it into a list!
    highScores.map( score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
        .join("")
    