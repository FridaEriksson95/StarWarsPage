//elementreferences
const searchField = document.querySelector('.searchField');
const peopleButton = document.querySelector('#people-button');
const aboutInfo = document.querySelector('.aboutInfo');
const playPauseButton = document.querySelector('#playPauseButton')
const audio = document.querySelector('#starWarsMusic');
const buttonText = playPauseButton.querySelector('span');
const killMeButton = document.querySelector('#killMeButton');

const saveToLocalStorage = () => {
    localStorage.setItem('textinput', aboutInfo.textContent);
};
// Latest Search
const showPreviousSearch = () => {
    const previousSearch = localStorage.getItem('textinput');
    if (previousSearch) {
        aboutInfo.textContent = previousSearch;
    }
};
searchField.addEventListener('input', characterSearch => {
    aboutInfo.textContent = characterSearch.target.value;
});
// save search
peopleButton.addEventListener('click', saveToLocalStorage);

// music
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        buttonText.textContent = ' Stop Music';
    } else {
        audio.pause();
        buttonText.textContent = ' Keep listening'; 
    }

    audio.addEventListener('ended', () => {
        buttonText.textContent = ' Press me';
    });
});

/*get information from api*/
peopleButton.addEventListener('click', getStarWarsInfo);

async function getStarWarsInfo() {
    const name = searchField.value;
    const baseUrl = 'https://swapi.dev/api/people/';
    const query = `?search=${name}`;
    
    try {
        const response = await fetch(baseUrl + query);
        const data = await response.json();
        
        if (data.results.length > 0) {
            const character = data.results[0];
            displayCharacterInfo(character);
        } else {
            aboutInfo.textContent = 'Sorry, seems we lack info about this specific character! Try another';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        aboutInfo.textContent = 'An error occurred. Please try again later.';
    }
}
// get homeworld info from API
async function getHomeworld(url) {
    try {
        const response = await fetch (url);
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching homeworld:', error);
        return 'Unknown';
    }
}
// display character info
async function displayCharacterInfo(character) {
    const homeworld = await getHomeworld(character.homeworld);

    aboutInfo.innerText = `Name: ${character.name}\n
    Gender: ${character.gender}\n
    Height: ${character.height} cm\n
    Mass: ${character.mass}\n
    Birth Year: ${character.birth_year}\n
    Eye Color: ${character.eye_color}\n
    Hair Color: ${character.hair_color}\n
    Skin Color: ${character.skin_color}\n
    HomeWorld: ${homeworld}`;
}
// Prepare to be killed - button with giph
killMeButton.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = "https://giphy.com/embed/Id5nSHOzBv9OJgTJGG";
    iframe.classList.add('styled-iframe'); 
    killMeButton.parentNode.replaceChild(iframe, killMeButton);
});
//killMeButton going along with page scrolling, tried millions of ways to get the giphy to do as well but did not manage
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 10) {
        killMeButton.classList.add('fixed');
    } else {
        killMeButton.classList.remove('fixed');
    }
});
// call function for previous Search
showPreviousSearch();