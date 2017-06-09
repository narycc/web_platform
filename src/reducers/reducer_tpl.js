/**
 * Created by wenbinzhang on 2017/5/22.
 */
import { handleActions, createAction } from 'react-redux';
import Immutable from 'immutable';

/**
 * action types
 */
export const YOU_ACTION_TYPES = 'YOU_ACTION_TYPES';


/**
 * actions
 */

export const youActionTypes = createAction(YOU_ACTION_TYPES);


/**
 * init State
 */

export const youState = Immutable.fromJS({
  name: 'xxx',
  mobile: 'xxx'
});


/**
 * reducer
 */

const reducer = handleActions({

}, youState);

export default reducer;