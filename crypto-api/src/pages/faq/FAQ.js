import React from 'react'

function FAQ() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {

      this.classList.toggle("active");

      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });

  }

  return (
    <div className='about-container'>
      <h2>
        Frequent Aasked Questions
      </h2>
        <div className='job-postings-list'>
          <div class="accordion">
            <span class="target-fix" id="accordion"></span>
            <div>
              <span class="target-fix" id="accordion1"></span>
              <a href="#accordion1" id="open-accordion1" title="open">Where does the data comes from?</a>
              <a href="#accordion" id="close-accordion1" title="close">Where does the data comes from?</a> 
              <div class="accordion-content">
                <p>
                  All the data on this website is provided through the CoinGecko API you can read more about their API <a href='https://coingecko.com/en/api' target='_blank' rel='noopener'> here</a> 
                  because the data comes from the API we are in certain way limited to the amount of data we have and what data is it.
                </p>
              </div>
            </div>
            <div>
              <span class="target-fix" id="accordion2"></span>
              <a href="#accordion2" id="open-accordion2" title="open">I can't find a coin!</a>
              <a href="#accordion" id="close-accordion2" title="close">I can't find a coin!</a>
              <div class="accordion-content">
                <p>
                  If thats the case please make sure to fill out a contact form with as much details about the coin as possible and we will do our beast to make sure to update our database with new coins.

                </p>       
              </div>
            </div>
            <div>
              <span class="target-fix" id="accordion3"></span>
              <a href="#accordion3" id="open-accordion3" title="open">I click in a coin but is not loading any data!</a>
              <a href="#accordion" id="close-accordion3" title="close">I click in a coin but is not loading any data!</a>
              <div class="accordion-content">
                <p>
                  If thats happening thats likely due to the API being offline or unvailable for some reason the best way to fix is let us now through a contact me form and we make sure to get the fastest support possible.
                </p>       
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FAQ