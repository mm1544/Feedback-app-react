import React from 'react'
import Card from '../components/shared/Card'
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About This Page</h1>
        <p>Buffalo ribeye doner picanha short loin sirloin. Sausage pork brisket, venison turkey ham ground round flank chicken pork loin jerky frankfurter short ribs strip steak t-bone. Shoulder salami ham meatloaf, ham hock landjaeger burgdoggen shank ground round beef ribs turducken prosciutto cupim frankfurter chuck. Pancetta cupim hamburger t-bone ball tip boudin. Hamburger beef ribs jerky kevin tenderloin t-bone strip steak short loin. Buffalo frankfurter sausage pastrami corned beef, drumstick jowl doner bacon ground round chicken beef sirloin andouille. Shank tongue meatball kevin tail corned beef.</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/">Back To Home</Link>
        </p>
      </div>
      
    </Card>
  )
}

export default AboutPage