import React, { Component } from 'react';
import Definition from './Definition';

class Flashcard extends Component {

  state = {
    currentTimeout: null,
    timer: 10,
    show: false,
  }

  // Decrement Timer until 0, then call onTimerEnd
  decrementTimer = () => {
    if (this.state.timer === 0) {
      this.props.onTimerEnd();
    } else {
      clearTimeout(this.state.currentTimeout);
      this.setState(prevState => ({
        timer: prevState.timer - 1,
        currentTimeout: window.setTimeout(this.decrementTimer, 1000)
      }));
    }
  }

  // Start Timer on Mount
  componentDidMount () {
    this.setState({
      currentTimeout: window.setTimeout(this.decrementTimer, 1000)
    });
  }

  // Reset timer when props changes (get new card)
  componentWillReceiveProps = () => {
    clearTimeout(this.state.currentTimeout);
    this.setState({
      timer: 10,
      currentTimeout: window.setTimeout(this.decrementTimer, 1000)
    });
  }

  // Toggle Word Definition
  toggleShow = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  render() {
    let { detail } = this.props;

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <h3>{this.state.timer}</h3>
            <h1>{detail.word}</h1>
            <div className="card-action">
              <button
                onClick={this.toggleShow}
                className='waves-effect waves-light btn'>
                {this.state.show ? 'Hide Definition' : 'Show Definition'}
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          {this.state.show && detail.definitions.map((def, idx) => <Definition def={def} key={def._id} idx={idx} />)}
        </div>
      </div>
    )
  }
}



export default Flashcard;
