import { Component } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Statistics from './Statistics';
import Notification from './Notification';

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = ev => {
    const btnName = ev.target.name;
    this.setState(prevState => {
      return { [btnName]: prevState[btnName] + 1 };
    });
  };

  countTotalFeedback() {
    const objValue = Object.values(this.state);
    console.log();
    return objValue.reduce(
      (previousValue, number) => previousValue + number,
      0
    );
  }

  countPositiveFeedbackPercentage() {
    const summFeedback = this.countTotalFeedback();
    const goodFeedback = this.state.good;
    let result = 100;
    if (summFeedback > 0) {
      result = Math.round((goodFeedback * 100) / summFeedback);
    }
    return `${result}%`;
  }

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const summFeedback = this.countTotalFeedback();

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {summFeedback > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={summFeedback}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
