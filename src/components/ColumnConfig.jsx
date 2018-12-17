import React, {Component} from 'react';
import Modal from 'react-modal';

const customColumnOptionStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ColumnConfig extends Component{
  constructor(props){
    super(props);
    this.state = {
      visibleColumnConfig: {},
    };
    this.setValuesOfVisibleColumnConfig = this.setValuesOfVisibleColumnConfig.bind(this);
  }
  setValuesOfVisibleColumnConfig (){
    this.props.setValuesOfVisibleColumnConfig(this.state.visibleColumnConfig);
  }
  componentWillMount(){
    this.setState ({
      visibleColumnConfig: this.props.visibleColumnConfig,
    });
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    if (event.target.checked ===  true) {
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: true,
        }
      });
    } else if(event.target.checked === false){
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: false,
        }
      });
    }
  };

 /* printChecked( metaData) {
    let formattedHeaderConfig = [];
    const items = document.getElementsByName('select-column');
    for (let i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox' && items[i].checked == true) {
        formattedHeaderConfig = metaData.headerConfig.forEach((dataObj) => {
          if (dataObj.key === items[i].key ) {
            return dataObj;
          }
        });
      }
      formattedHeaderConfig = metaData.headerConfig.forEach((dataObj) => {
        if (dataObj.key === 'edit'|| dataObj.key === 'delete' ) {
          return dataObj;
        }
      });
    }
    this.setState({
      metaData: {
        ...this.state.metaData,
        headerConfig: formattedHeaderConfig,
      },
    });
  }*/
  render(){
    return(
      <Modal
        isOpen={this.props.ColumnOptionIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeColumnOption}
        style={customColumnOptionStyles}
        contentLabel="Column Options"
      >

        <h2> Select Column</h2>
        <form>
          <div className="column-group">
            <div>
              <label className="label">
                <input type="checkbox" name="name" onChange={this.handleChange} checked={this.state.visibleColumnConfig.name ? "checked": ""} />Name
              </label>
              <label className="label">
                <input type="checkbox" name="fatherName" onChange={this.handleChange} checked={this.state.visibleColumnConfig.fatherName ? "checked": ""} /> Father Name
              </label>
              <label className="label">
                <input type="checkbox" name="mobile" onChange={this.handleChange} checked={this.state.visibleColumnConfig.mobile ? "checked": ""} />Mobile No.
              </label>
              <label className="label">
                <input type="checkbox" name="email" onChange={this.handleChange} checked={this.state.visibleColumnConfig.email ? "checked": ""} />Email ID
              </label>
              <label className="label">
                <input type="checkbox" name="gender" onChange={this.handleChange} checked={this.state.visibleColumnConfig.gender ? "checked": ""} />Gender
              </label>
              <label className="label">
                <input type="checkbox" name="age" onChange={this.handleChange} checked={this.state.visibleColumnConfig.age ? "checked": ""} />Age
              </label>
              <label className="label">
                <input type="checkbox" name="address" onChange={this.handleChange} checked={this.state.visibleColumnConfig.address ? "checked": ""} />Address
              </label>
              <label className="label">
                <input type="checkbox" name="education" onChange={this.handleChange} checked={this.state.visibleColumnConfig.education ? "checked": ""} />Education
              </label>
            </div>
            <div >
              <label className="label">
                <input type="checkbox" name="classAttended2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2016 ? "checked": ""} />Class Attended 2016
              </label>
              <label className="label">
                <input type="checkbox" name="classAttended2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2017 ? "checked": ""} />Class Attended 2017
              </label>
              <label className="label">
                <input type="checkbox" name="attendance2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2016 ? "checked": ""} />Attendance 2016
              </label>
              <label className="label">
                <input type="checkbox" name="attendance2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2017 ? "checked": ""} />Attendance 2017
              </label>
              <label className="label">
                <input type="checkbox" name="classRoomNo2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2016 ? "checked": ""} />Class Room No. 2016
              </label>
              <label className="label">
                <input type="checkbox" name="classRoomNo2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2017 ? "checked": ""} />Class Room No. 2017
              </label>
              <label className="label">
                <input type="checkbox" name="marks2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2016 ? "checked": ""} />Marks 2016
              </label>
              <label className="label">
                <input type="checkbox" name="marks2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2017 ? "checked": ""} />Marks 2017
              </label>
              <label className="label">
                <input type="checkbox" name="edit" onChange={this.handleChange} checked={this.state.visibleColumnConfig.edit ? "checked": ""} />Edit
              </label>
            </div>
          </div>
        </form>
        <button onClick={this.props.closeColumnOption}>Close</button>
        <button className="save-buttom" onClick={this.setValuesOfVisibleColumnConfig}>Save</button>
      </Modal>
    );
  }
}
export default ColumnConfig;