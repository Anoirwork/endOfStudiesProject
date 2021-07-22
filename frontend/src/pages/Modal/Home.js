import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import logo from "../../assets/logo.png";
import how from "../../assets/how.png";
import fam from "../../assets/fam.jpg";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Segment>
          <img src={logo} height="50" width="300" alt="logo Veganet Tunisie"/>
          <h1>VEGANET KidsTracker </h1>
          <p>
          <h2>Introduction</h2>
            <ul>
            Do you like knowing your family is safe by using a location tracker app at all times or are you looking for a free family tracker app that will help you track where your loved ones’ are just as needed? Is it a never-ending battle between giving your loved ones freedom and always wanting to know where they are? A family tracker app is a very good compromise.
            Thanks to the latest technology, a family tracker app for Android or iPhone can help you find and locate a smartphone. All you need to have is a family location tracker app and a smartphone. Yet with so many apps available for family tracking, finding the right one for you might be challenging. We've compiled the best family tracker app for Android and iPhone list to help you find the right one for you.
            </ul>
            <img src={fam} width="60%" alt="Family safe"/>
            <br></br>
            <h2>ABOUT US</h2>
            <ul>
            VEGANET is a Tunisian IT Services Company specialized in software development and IT services. VEGANET provides a center of expertise in computer engineering to support software editing companies, service companies, SMEs / SMIs and End Users in the implementation of their IT projects
            
            </ul>
          </p>
        </Segment>
      </div>
    );
  }
}
