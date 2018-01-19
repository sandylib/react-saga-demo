/**
*
* LinkForm
*
*/

import React from 'react';
import TextInput from '../TextInput';

import styles from './styles.css';

class LinkForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addLink: React.PropTypes.func.isRequired,
    topicName: React.PropTypes.string.isRequired,
    addLinkCancel: React.PropTypes.func.isRequired,
  }
  state = {
    urlError: '',
    descriptionError: '',
  };
  onAdd = () => {
    const url = this.url.value();
    const description = this.description.value();
    let urlError = '';
    let descriptionError = '';

    if (!url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g)) {
      urlError = 'Please provide valid url';
    }

    if (!description) {
      descriptionError = 'Please provide a valid description';
    }

    this.setState({
      urlError,
      descriptionError,
    });

    if (urlError || descriptionError) {
      return;
    }

    this.props.addLink({
      url,
      description,
      topicName: this.props.topicName,
    });
  }
  render() {
    return (
      <div className={styles.overlay}>
        <div className={styles.linkForm}>
          <div className={styles.heading}>
            Add Link
          </div>
          <TextInput
            placeHolder="URL"
            className={styles.input}
            errorText={this.state.urlError}
            ref={(f) => (this.url = f)}
          />
          <TextInput
            placeHolder="Description"
            className={styles.input}
            errorText={this.state.descriptionError}
            ref={(f) => (this.description = f)}
          />
          <div className={styles.actionContainer}>
            <div
              className={styles.button}
              onClick={this.props.addLinkCancel}
            > cancel </div>
            <div
              className={styles.button}
              onClick={this.onAdd}
            > Add </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LinkForm;
