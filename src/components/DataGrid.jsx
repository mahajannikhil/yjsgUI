import React, {Component} from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import DataGrid from 'simple-react-data-grid';
import isEmpty from 'lodash/isEmpty';
import { Redirect } from 'react-router-dom';
//import Modal from 'react-modal';

import ColumnConfig from './ColumnConfig';
import { allStudentsData } from '../reducers/studentRegistrationReducer';
import { getAllStudentsAction, setStudentDataAction } from  '../actions/studentRegistrationActions';
import {
  stateOfRedirect,
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';

const gridMetaData = [
  {
    'name': 'Name',
    'key': 'name',
  },
  {
    'name': 'Father Name',
    'key': 'fatherName',
  },
  {
    'name': 'Gender',
    'key': 'gender',
  },
  {
    'name': 'Age',
    'key': 'age',
  },
  {
    'name': 'Education',
    'key': 'education',
  },
  {
    'name': 'Mobile',
    'key': 'mobile',
  },
  {
    'name': 'Email',
    'key': 'email',
  },
  {
    'name': 'Address',
    'key': 'address',
  },
  {
    'name': 'Class Attended 2016',
    'key': 'classAttended2016',
  },
  {
    'name': 'Class Attended 2017',
    'key': 'classAttended2017',
  },
  {
    'name': 'Attendance 2016',
    'key': 'attendance2016',
  },
  {
    'name': 'Attendance 2017',
    'key': 'attendance2017',
  },
  {
    'name': 'Class Room No. 2016',
    'key': 'classRoomNo2016',
  },
  {
    'name': 'Class Room No. 2017',
    'key': 'classRoomNo2017',
  },
  {
    'name': 'Marks 2016',
    'key': 'marks2016',
  },
  {
    'name': 'Marks 2017',
    'key': 'marks2017',
  },
  {
    'name': 'Edit Information',
    'key': 'edit',
    'disableFilter': true,
  },
];

const gridHeaderData = () => ({
  headerConfig: gridMetaData,
  recordsPerPage: 25,
  drawerPosition: 'top',
  includeAllInGlobalFilter: true,
  includeGlobalFilter: true,
});

/*const  printChecked = ( metaData, visibleColumnConfig ) => {
  /!* let formattedHeaderConfig = [];
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
   });*!/
  const formattedMetaData = [];
  //console.log("element..........");
  metaData.headerConfig.forEach(function (metaDataObject) {
    for( var propt in visibleColumnConfig) {
      //console.log("element..........", propt);
      if (metaDataObject.key === propt && visibleColumnConfig[propt]) {
        formattedMetaData.push(metaDataObject);
      }
    }
  });
  return { ...metaData, 'headerConfig': formattedMetaData }
};*/

const getStyles = () => ({
  gridWrapper: {
    'width': 'auto',
  },
});

const customAdvanceFilterStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class DataGrid1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      metaData: gridHeaderData(),
      columnOptionIsOpen:false,
      isStudentDataSet: false,
      advanceFilterIsOpen: false,
      visibleColumnConfig: {
        name: true,
        fatherName: true,
        mobile: true,
        email: true,
        gender: true,
        age: true,
        address: true,
        education: true,
        classAttended2016: true,
        classAttended2017: true,
        attendance2016: true,
        attendance2017: true,
        classRoomNo2016: true,
        classRoomNo2017: true,
        marks2016: true,
        marks2017: true,
        edit: true,
      }
    };
    this.openColumnOption = this.openColumnOption.bind(this);
    this.closeColumnOption = this.closeColumnOption.bind(this);
    this.openAdvanceFilter = this.openAdvanceFilter.bind(this);
    this.closeAdvanceFilter = this.closeAdvanceFilter.bind(this);
    this.setValuesOfVisibleColumnConfig = this.setValuesOfVisibleColumnConfig.bind(this);
  }
  componentWillMount(){
    this.setState({
       metaData: this.formatMetaData(this.state.visibleColumnConfig)
    })
  }
  openColumnOption() {
    this.setState({columnOptionIsOpen: true});
  }
  closeColumnOption() {
    this.setState({columnOptionIsOpen: false});
  }
  openAdvanceFilter() {
    this.setState({advanceFilterIsOpen: true});
  }
  closeAdvanceFilter() {
    this.setState({advanceFilterIsOpen: false});
  }
  setValuesOfVisibleColumnConfig(values){
    this.setState({
      visibleColumnConfig : values,
      metaData: this.formatMetaData(values),
    })
  }
  formatMetaData = (visibleColumnConfig) => {
    const metaData = [];

    for(const columnKey in visibleColumnConfig) {
      if (visibleColumnConfig[columnKey]) {
        if (columnKey === 'edit') {
          metaData.push({
            ...gridMetaData.find(metaDataObj => metaDataObj.key === columnKey),
              customComponent: this.EditButton
          })
        } else {
          metaData.push(gridMetaData.find(metaDataObj => metaDataObj.key === columnKey))
        }
      }
    }

    // const custom = cloneDeep(this.state.metaData);
    // const formattedHeaderConfig = custom.headerConfig.map((dataObj) => {
    //   if (dataObj.key === 'edit') {
    //     return {...dataObj, customComponent: this.EditButton};
    //   }
    //   if (dataObj.key === 'delete') {
    //     return {...dataObj, customComponent: this.DeleteButton};
    //   }
    //   return {...dataObj};
    // });
    // const formattedMetaData = [];
    // formattedHeaderConfig.forEach(function (metaDataObject) {
    //   for( var propt in visibleColumnConfig) {
    //     //console.log("element..........", propt);
    //     if (metaDataObject.key === propt && visibleColumnConfig[propt]) {
    //       formattedMetaData.push(metaDataObject);
    //     }
    //   }
    // });
    // return {...metaData, 'headerConfig': formattedMetaData};

    return {...this.state.metaData, headerConfig: metaData};
  };

  handleEditClick(rowData) {
    if (!isEmpty(rowData)) {
      this.props.setStudentDataAction(rowData);
      this.setState({
        isStudentDataSet: true,
      });
    }
  }

  redirectToStudentCorrection() {
    if (this.state.isStudentDataSet){
      return <Redirect to={'/studentCorrection'}/>
    }
    return null;
  }
  EditButton = ({ rowData }) => (
    <div><button onClick={() => { this.handleEditClick(rowData) }}>Edit</button></div>
  );
  DeleteButton = ({ rowData }) => (
    <div><button onClick={() => { alert(`First Name: ${rowData.firstName}, Last Name: ${rowData.lastName}`); }}>Delete</button></div>
  );
  componentDidMount() {
    this.props.getAllStudentsAction();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.students!== this.props.students) {
      this.setState({
        students: nextProps.students,
      });
    }
  }
  render(){
    //const NewformattedMetaData = printChecked(this.state.metaData, this.state.visibleColumnConfig);
    const { students, } = this.state;

    if(!isEmpty(students) && this.props.redirect && this.props.adminLoginState) {
      return(
        <div>
          <div className="model">
            <div className="column-option">
              <button onClick={this.openColumnOption}>Column Options</button>
              <ColumnConfig
                ColumnOptionIsOpen= {this.state.columnOptionIsOpen}
                closeColumnOption= {this.closeColumnOption}
                visibleColumnConfig= {this.state.visibleColumnConfig}
                setValuesOfVisibleColumnConfig = {this.setValuesOfVisibleColumnConfig}

              />
            </div>
            {/*<div className="advance-filter">
             <button onClick={this.openAdvanceFilter}>Advance Filter</button>
             <Modal
             isOpen={this.state.AdvanceFilterIsOpen}
             onAfterOpen={this.afterOpenModal}
             onRequestClose={this.closeAdvanceFilter}
             style={customAdvanceFilterStyles}
             contentLabel="Advance Filter"
             >

             <h2> Enter fields to filter</h2>
             <form>
             <div className="column-group">
             <div >
             <label className="label">
             Name:<input className="filter-input-filed" type="text" key="name" name="advance-filter-filed" />
             </label>
             <label className="label">
             Father Name:<input className="filter-input-filed" type="text" key="fatherName" name="advance-filter-filed" />
             </label>
             <label className="label">
             Mobile No.:<input className="filter-input-filed" type="text" key="mobile" name="advance-filter-filed" />
             </label>
             <label className="label">
             Email ID:<input className="filter-input-filed" type="text" key="email" name="advance-filter-filed" />
             </label>
             <label className="label">
             Gender:<input className="filter-input-filed" type="text" key="gender" name="advance-filter-filed" />
             </label>
             <label className="label">
             Age:<input className="filter-input-filed" type="text" key="age" name="advance-filter-filed" />
             </label>
             <label className="label">
             Address:<input className="filter-input-filed" type="text" key="address" name="advance-filter-filed" />
             </label>
             <label className="label">
             Education:<input className="filter-input-filed" type="text" id="education" name="advance-filter-filed" />
             </label>
             </div>
             <div >
             <label className="label">
             Class Attended 2016:<input className="filter-input-filed" type="text" key="classAttended2016" name="advance-filter-filed" />
             </label>
             <label className="label">
             Class Attended 2017:<input className="filter-input-filed" type="text" key="classAttended2017" name="advance-filter-filed" />
             </label>
             <label className="label">
             Attendance 2016:<input className="filter-input-filed" type="text" key="attendance2016" name="advance-filter-filed" />
             </label>
             <label className="label">
             Attendance 2017:<input className="filter-input-filed" type="text" key="attendance2017" name="advance-filter-filed" />
             </label>
             <label className="label">
             Class Room No. 2016:<input className="filter-input-filed" type="text" key="classRoomNo2016" name="advance-filter-filed" />
             </label>
             <label className="label">
             Class Room No. 2017:<input className="filter-input-filed" type="text" key="classRoomNo2017" name="advance-filter-filed" />
             </label>
             <label className="label">
             Marks 2016:<input className="filter-input-filed" type="text" key="marks2016" name="advance-filter-filed" />
             </label>
             <label className="label">
             Marks 2017:<input className="filter-input-filed" type="text" key="marks2017" name="advance-filter-filed" />
             </label>
             </div>
             </div>
             </form>
             <button onClick={this.closeAdvanceFilter}>Close</button>
             <button className="save-buttom" onClick={/!*this.printChecked(this.state.metaData)*!/}>Filter</button>
             </Modal>
             </div>*/}
          </div>
          { this.redirectToStudentCorrection() }
          <DataGrid data={students}  metaData={this.state.metaData}  styles={getStyles()} />
        </div>
      );

    }
    return(
      <div> Loading...</div>
    );
  }
}
const mapStateToProps = state => ({
  students: allStudentsData(state),
  redirect: stateOfRedirect(state),
  adminLoginState: stateOfAdminLogin(state),
});
export default connect(mapStateToProps, {
  getAllStudentsAction,
  setStudentDataAction,
})(DataGrid1);
