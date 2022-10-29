import React from 'react'

function About() {
  return (
    <div className='about-container'>
      <h2>
        About Us
      </h2>
      <div>
        <h3>
          Who are we?
        </h3>
        <p>
          Mock Crypto is a personal project developed with ReactJS as my framework,
          Firebase as the online hosting and user authenticator, firestore as my database
          and CoinGecko as the API. The purpose of the project was to improve my knowledge
          working wiht API's. Through this project I learned a lot about mapping arrays, fetching
          data with API calls, passing data through react components in order to optimize API calls.
          And much more, I want to focus on completing more personal projects as well as adding on
          functionalities to already functioning projects. I would like to add some kind of forum to this project
          so that fans of crypto can share their especulations and informations. as well as add aditional informations
          on coins and maybe some additional tools to help analize coins.
        </p>
        <div className='divider'></div>
        <h3>
          About our API
        </h3>
        <p>
          We currently use the CoinGecko API its a free API that does not require authentication keys or anything for the free their
          however it does have limitatios on the amount of calls allowed per minute so in the case of the project expanding we will make sure
          all the info you require will be accessible to you you can read more about the API limitations and capabilities  
          <a href='https://www.coingecko.com/en/api' target='_blank' rel='noopener'> here</a> if you have any questions or any suggestions please fill out a <a href='/contact'> contact me form </a> 
          we will be happy to answer you.
        </p>
        <div className='divider'></div>
        <h3>
          About Me
        </h3>
        <p>
          As mentioned in the first seaction this website was a personal project. My name is Victor Barreto de Oliveira I'm currently in the process 
          of studying to become a web developer this project is helping me learn new tools and practice some usefull tools. if you are also interested in
          web developing you can access all the code for this website on my <a href='https://github.com/vbarreto03' target='_blank' rel='noopenr'>github</a> or if you would
          like to see other projects you can see my personal website <a href='https://victordeoliveira.net' target='_blank' rel='noopener'> here</a> you can find my 
          contact info there feel free to message me with any questions you may have.
        </p>
      </div>
    </div>
  )
}

export default About