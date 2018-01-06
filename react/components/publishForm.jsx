import React from 'react';
import PreviewDropzone from './previewDropzone.jsx';
import TitleInput from './titleInput.jsx';
import ChannelSelector from './channelSelector.jsx';
import UrlChooser from './urlChooser.jsx';
import ThumbnailInput from './thumbnailInput.jsx';
import MetadataInputs from './metadataInputs.jsx';

class AnonymousOrChannelSelect extends React.Component {
  constructor (props) {
    super(props);
    this.toggleAnonymousPublish = this.toggleAnonymousPublish.bind(this);
  }
  toggleAnonymousPublish (event) {
    const value = event.target.value;
    if (value === 'anonymous') {
      this.props.updateUploaderState('publishToChannel', false);
    } else {
      this.props.updateUploaderState('publishToChannel', true);
    }
  }
  render () {
    return (
      <div className="row row--padded row--short row--wide">
        <div className="column column--10">
          <form>
            <div className="column column--3 column--med-10">
              <input type="radio" name="anonymous-or-channel" id="anonymous-radio" className="input-radio" value="anonymous" checked={!this.props.publishToChannel} onChange={this.toggleAnonymousPublish}/>
              <label className="label label--pointer" htmlFor="anonymous-radio">Anonymous</label>
            </div>
            <div className="column column--7 column--med-10">
              <input type="radio" name="anonymous-or-channel" id="channel-radio" className="input-radio" value="in a channel" checked={this.props.publishToChannel} onChange={this.toggleAnonymousPublish}/>
              <label className="label label--pointer" htmlFor="channel-radio">In a channel</label>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

class PublishForm extends React.Component {
  constructor (props) {
    super(props);
    // set defaults
    this.updateUploaderState = this.updateUploaderState.bind(this);
    this.clearUploaderState = this.clearUploaderState.bind(this);
    this.publish = this.publish.bind(this);
  }
  updateUploaderState (name, value) {
    this.props.updateUploaderState(name, value);
  }
  clearUploaderState () {
    this.props.clearUploaderState();
  }
  publish () {
    // publish the asset
  }
  render () {
    return (
      <div className="row row--no-bottom">
        <div className="column column--10">

          <TitleInput title={this.props.title} updateUploaderState={this.updateUploaderState}/>

        </div>
        <div className="column column--5 column--sml-10" >
          <div className="row row--padded">

            <PreviewDropzone
              file={this.props.file}
            />
            { (this.props.file.type === 'video/mp4') && <ThumbnailInput thumbnail={this.props.thumbnail}/> }
          </div>
        </div>
        <div className="column column--5 column--sml-10 align-content-top">
          <div id="publish-active-area" className="row row--padded">

            <UrlChooser
              fileName={this.props.file.name}
              claim={this.props.claim}
              publishToChannel={this.props.publishToChannel}
              loggedInChannelName={this.props.loggedInChannelName}
              loggedInChannelShortId={this.props.loggedInChannelShortId}
              cleanseInput={this.props.cleanseInput}
              updateUploaderState={this.updateUploaderState}
              makeGetRequest={this.props.makeGetRequest}
            />
            <AnonymousOrChannelSelect
              publishToChannel={this.props.publishToChannel}
              updateUploaderState={this.props.updateUploaderState}
            />
            <ChannelSelector
              loggedInChannelName={this.props.loggedInChannelName}
              publishToChannel={this.props.publishToChannel}
              cleanseInput={this.props.cleanseInput}
              updateUploaderState={this.updateUploaderState}
              makeGetRequest={this.props.makeGetRequest}
              makePostRequest={this.props.makePostRequest}
              updateUploaderState={this.props.updateUploaderState}
            />

            <MetadataInputs />

            <div className="row row--padded row--wide">
              <div className="input-error" id="input-error-publish-submit" hidden="true">{this.props.inputError}</div>
              <button id="publish-submit" className="button--primary button--large" onClick={this.publish}>Publish</button>
            </div>

            <div className="row row--short align-content-center">
              <button className="button--cancel" onClick={this.clearUploaderState}>Cancel</button>
            </div>

            <div className="row row--short align-content-center">
              <p className="fine-print">By clicking 'Upload', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className="link--primary" target="_blank" href="https://lbry.io/learn">Read more.</a></p>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

module.exports = PublishForm;
