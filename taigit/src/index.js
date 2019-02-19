import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; 
import team from './reducers/team';

import './index.css';
import App from './App';

let baseStore = {
  teamMembers: [
    {
      name: 'Bailey Routzong',
      taigaId: 'broutzong',
      githubId: 'broutzong',
      pictureUrl: 'https://baileyroutzong.com/wp-content/uploads/2015/03/circle-man.png',
      totalCommits: 45
    },
    {
      name: 'Amy Koffee',
      taigaId: 'akoffee',
      githubId: 'akoffee',
      pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhi8xXNgLziI1Orp9x_10TGtmQSnZlCOseWC_0uUh5ZMhE5QM',
      totalCommits: 34
    },
    {
      name: 'Miguel Smith',
      taigaId: 'msmith',
      githubId: 'msmith',
      pictureUrl: 'https://broadstreetautoloans.com/Content/images/circle-person02.png',
      totalCommits: 23
    },
    {
      name: 'Mr Wicked',
      taigaId: 'wickedfan',
      githubId: 'wicked4eva',
      pictureUrl: 'http://www.onecenter.in/wp-content/uploads/2018/07/face.png',
      totalCommits: 34
    }
  ]
};

const store = createStore(team, baseStore);
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
