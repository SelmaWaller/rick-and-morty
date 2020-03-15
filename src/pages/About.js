import React, {Component} from 'react';

import rickstoilet from './../images/rickstoilet.jpg';
import Collapsible from 'react-collapsible';

export default class About extends Component {
  render() {
    return (
      <div className="about">
        <div className="innerCard boxShadow about textCenter">
          <h2>Frequently never asked questions</h2>
          <Collapsible trigger="Why did you make this website?">
            <p>I had to</p>
          </Collapsible>
          <Collapsible trigger="Which episode is your favorite?">
            <p>The Ricklantis Mixup/The Old Man and the Seat</p>
            <img src={rickstoilet} alt="ricks-toilet" />
          </Collapsible>
          <Collapsible trigger="Do you have a favorite character?">
            <p>Doofus Rick</p>
          </Collapsible>
          <Collapsible trigger="Do you think Beth is a clone?">
            <p>No</p>
          </Collapsible>
          <Collapsible trigger="What's your favorite quote from the show?">
            <p>
              "Stupid ass fart-saving carpet store motherfucker" always cracks
              me up
            </p>
          </Collapsible>
        </div>
      </div>
    );
  }
}
