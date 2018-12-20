import Fuse from 'fuse.js';

import React, {Component} from 'react';


class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.onAdvanceSearchChange = this.onAdvanceSearchChange.bind(this);
    this.renderAdvanceSearch = this.renderAdvanceSearch.bind(this);
  }
  onAdvanceSearchChange() {
    const foundKeys = this.props.metaData.headerConfig.map((object) => {
        return object.key;
      }
    );
    let options = {
      shouldSort: true,
      threshold: Number(this.props.thresholdValue),
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: foundKeys,
    };
    let fuse = new Fuse(this.props.students, options);
    let result = fuse.search(this.props.inputValue);
    this.props.setStudentData(result);
  }
  renderAdvanceSearch() {
    return (
      <div>
        <input type="radio" name="thresholdValue" value="0.0" onChange={this.props.onChangeCheckBox}  defaultChecked="true" /*checked={this.props.thresholdValue === '0.0' ? "checked": ""*/  />Normal Search
        <input type="radio" name="thresholdValue" value="0.6" onChange={this.props.onChangeCheckBox} /*checked={this.props.thresholdValue === '0.6' ? "checked": ""}*/ />Deep Search
        <input type="text" onChange={this.props.setInputValue}/>
        <button onClick={this.onAdvanceSearchChange}>Search</button>
      </div>
    );
  }

  render(){
    return(
      <div>
        {this.renderAdvanceSearch()}
      </div>
    );
  }
}
export default AdvanceSearch;