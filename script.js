const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('ldsroller');

// Loading Spinner Shown
function showLoadingSpinner() {
    loader.hidden = false;
    loader.style.display = 'inline-block'
    quoteContainer.hidden = true;
}

// // Remove Loading Spinner
function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
        loader.style.display = 'none';
    }
}

// GET Quote from API
async function getQuote() {
    showLoadingSpinner()
    const apiUrl = "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.quotes[0])
        // Check if author field is blank and replace it with 'Unknown
        if(data.quotes[0].author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText =  data.quotes[0].author;
        }
        // // Dynamically reduce fontsize for long quotes
        if(data.quotes[0].text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quotes[0].text;
        removeLoadingSpinner();
    } catch(error) {
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners 
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();