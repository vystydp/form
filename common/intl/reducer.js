import messages from './messages';
import {Record} from 'immutable';

console.log(messages);

const InitialState = Record({
  availableLanguages: ['cs','en'],
  msg: messages.cs,
  selectedLanguage: 'cs'
});
const initialState = new InitialState;

const revive = state => initialState
  .set('selectedLanguage', state.selectedLanguage);

export default function intlReducer(state = initialState) {
  if (!(state instanceof InitialState)) return revive(state);

  // TODO: Add SET_APP_LANGUAGE action.

  return state;
}
