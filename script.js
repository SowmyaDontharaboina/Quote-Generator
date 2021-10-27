let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Get quotes from API
const getQuotes = async () => {
    loading();
    try {
        const response = await fetch('https://type.fit/api/quotes');
        apiQuotes = await response.json();
        console.log(apiQuotes);
        getRandomQoutes();
    } catch(error) {
        console.log(error);
    }
}

const getRandomQoutes = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote)
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author || 'Unknown';
    quote.text.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    complete();
};

const newQoute = () => {
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
};

newQuoteBtn.addEventListener('click', () => {
    getRandomQoutes();
})

twitterBtn.addEventListener('click', () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
})
getQuotes();
//newQoute();