/**
 * Created by wenbinzhang on 2017/5/4.
 */

import { VisibilityFilters } from './todoActionTypes';

import Immutable from 'immutable';

export const TodoState = Immutable.fromJS({
  todos: [],
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  inputValue: ''
});

