//use strict;

//modifiying dom content

let quoteText=document.getElementById('quote');
let authorText =document.getElementById('author')
let twitterButton = document.getElementById('twitter')
let nextQuoteButton = document.getElementById('new-quote')

let Quotes=[];
let quote; 

//new quote button code

function newQuote(){
    let index =Math.floor(Math.random()*Quotes.length);
        quote=Quotes[index];
       // console.log(quote);

}
// get quote function
async function getQuote(){
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
