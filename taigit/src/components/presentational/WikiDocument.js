import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

const input = '# This is a header\n\nAnd this is a paragraph'

export default class WikiDocument extends Component {
  render() {
    return(
      <div className="wiki-doc">
        <div className="wiki-doc-title">
          <h3>Sprint 2 Planning - UI Team</h3>
        </div>
        <div className="wiki-contents">
          <ReactMarkdown source={input} />
        </div>
      </div>
    );
  }
}