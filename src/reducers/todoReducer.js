/**
 * Created by zpp on 2017/06/10.
 * 仍然需要除了todo 相关之外的其他actions type
 */
import { handleActions,createAction } from 'redux-actions';
import Immutable , {List} from 'immutable';
import moment from 'moment';



export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const ADD_TODO_INPUT = 'ADD_TODO_INPUT';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const DELETE_TODO = 'DELETE_TODO';
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const addTodo = createAction(ADD_TODO);
export const toggleTodo = createAction(TOGGLE_TODO);
export const setVisibilityFilter = createAction(SET_VISIBILITY_FILTER);
export const addTodoInput = createAction(ADD_TODO_INPUT);
export const deleteTodo = createAction(DELETE_TODO);

export const TodoState = Immutable.fromJS({
  todos: [],
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  inputValue: '',

  // 类型变化输入框
  typeSearch:{
    menuList: [
      {
        name: '姓名',
        type: 3
      },
      {
        name: '手机号',
        type: 2
      },
      {
        name: '收入',
        type: 1
      }
    ],
    selectMenuIndex: 0,
    isMenuOpen: false,
    inputValue: ''
  },

  // 单选或者多选组件
  statusFormCheckData : {
    label: '状态单选',
    checkType: 'radio',
    styleType: 'inline',
    list: [
      {
        name: '全部',
        value: ''
      },
      {
        name: '待上线',
        value: 0
      },
      {
        name: '已上线',
        value: 1
      },
      {
        name: '已下架',
        value: 2
      }
    ],
    selectIndexList: [0],
  },

  // 时间选择器
  datePicker: {
    focusedInput: null,
    startDate: moment(),
    endDate: moment(),
  },

  // 带类型选择的时间选择器
  typeDatePickerData: {
    menuList: [ {
      name:'预约时间',
      value: 1
    },{
      name:'到期时间',
      value: 2
    }],
    selectMenuIndex: 0,
    isMenuOpen: false,
    // 时间选择器
    datePicker: {
      focusedInput: null,
      startDate: moment(),
      endDate: moment(),
    }
  },

  // 区间选择
  rangeData:{
    rangeFrom : '',
    rangeTo:''
  },

  // 基于表的操作按钮
  tableBtnList: [
    {
      name: '刷新列表',
      iconClassName: 'fa fa-refresh'
    }
  ],

  // 表展示的列表
  listData: {
    head: ['编号', '姓名', '手机号', '收入', '操作'],
    empty: {
      title: '无数据',
      message: '数据列表为空'
    },
  },

  original: {},

  // 翻页组件
  pagination: {
    total: 0,
    page: 0,
  },

  // 加载组件
  isLoading: false,
});

const todoReducer = handleActions({
  [ADD_TODO]: (state, {payload}) => {
    let todos = state.get('todos').push(payload);
    return state.set('todos', todos);
  },
  [TOGGLE_TODO]: (state, {payload}) => {
    let todos = state.get('todos').map(todo => {
      if (todo.id === payload) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    return state.set('todos', todos);
  },
  [ADD_TODO_INPUT]: (state, {payload}) => {
    return state.set('inputValue', payload);
  },
  [SET_VISIBILITY_FILTER]: (state, {payload}) => {
    return state.set('visibilityFilter', payload.filter);
  },
  [DELETE_TODO]: (state, {payload}) => {
    let todos = state.get('todos').filter(todo => {
      return todo.id !== payload;
    });
    return state.set('todos', todos);
  }
}, TodoState);

export default todoReducer;