//use strict;

//modifiying dom content

let quoteText=document.getElementById('quote');
let authorText =document.getElementById('author')
let twitterButton = document.getElementById('twitter')
let nextQuoteButton = document.getElementById('new-quote')
let quoteContainer = document.getElementById('quote-container');
let loadConatiner = document.getElementById('loader');

let Quotes=[];
let quote; 

// loading

function loading(){
    loadConatiner.hidden=false;
    quoteContainer.hidden=true;

}
// complete loading

function complete(){
    quoteContainer.hidden=false;
    loadConatiner.hidden=true;
}

//new quote button code

function newQuote(){
    loading();
    let index =Math.floor(Math.random()*Quotes.length);
        quote=Quotes[index];
       // console.log(quote);

}
// get quote function
async function getQuote(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        
        let resoponse = await fetch(apiUrl);
        Quotes = await resoponse.json();
        newQuote();
      // console.log(quote);
        if(quote.text.length>50 ){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent=quote.text;
        complete();
        if(quote.author!== null){

            authorText.textContent=quote.author;
        }else{
            authorText.textContent='unkown';
        }
    }catch(error){
        console.log(error);
    }
}




//twiiter button code

function postTweet(){
let twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text}-${quote.author}`;
window.open(twitterUrl,'_blank')




}
twitterButton.addEventListener('click',postTweet);



getQuote();

nextQuoteButton.addEventListener('click',getQuote);
