import React, { Component } from 'react';
import Flashcard from './Flashcard';
import axios from 'axios';
import { CLIENT_URL } from '../constants.js';

class FlashcardContainer extends Component {

  state = {
    flashcards: [],
    currentIndex: 0,
  }

  // Handle Next Word
  next = () => {
    let nextIndex = (this.state.currentIndex + 1) !== this.state.flashcards.length
      ? this.state.currentIndex + 1
      : this.state.currentIndex;

    this.setState({ currentIndex: nextIndex });
  }

  // Handle Previous Word
  prev = () => {
    let prevIndex = (this.state.currentIndex - 1) < 0
      ? 0
      : (this.state.currentIndex - 1);
    this.setState({ currentIndex: prevIndex });
  }

  // Handle Left and Right Arrow Events
  handleKeyUp = (event) => {
    if (event.keyCode === 39) {
      this.next();
    }
    if (event.keyCode === 37) {
      this.prev();
    }
  }

  // Call API For Data, Add Keyup Event Listener
  componentDidMount () {
    // Add Event Listener For Next & Previous Arrow Keys
    window.addEventListener('keyup', this.handleKeyUp);

    axios.get(`${CLIENT_URL}`)
      .then(response => this.setState({ flashcards: response.data }))
      .catch(err => console.log(err));
  }

  // Remove Keyup Event Listener
  componentWillUnmount () {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    let flashcard = this.state.flashcards[this.state.currentIndex];

    return (
      <div>
        <main>
          <div className="row">
            <div className="container">
              {flashcard && <Flashcard detail={flashcard} onTimerEnd={this.next} />}
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default FlashcardContainer;
