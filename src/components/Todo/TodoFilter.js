/**
 * Created by wenbinzhang on 2017/5/8.
 */
import React from 'react';
import {VisibilityFilters} from '../../constants/todoActionTypes';

const TodoFilter = ({selectFilter, onFilterChange}) => {
  return (
    <div>
      {
        Object.keys(VisibilityFilters).map(filter =>
          <div className="form-check form-check-inline" key={filter}>
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="todoVisibilityFilterRadio"
                value={filter}
                checked={filter === selectFilter}
                onChange={() => {
                  onFilterChange(filter);
                }}
              />
              {filter}
            </label>
          </div>
        )
      }
    </div>
  );
}

export default TodoFilter;