import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import * as shortId from 'shortid';
import Barcode from 'react-barcode';

class StudentIdCardModal extends Component {
  constructor(props) {
    super(props);
    this.renderStudentIdCards = this.renderStudentIdCards.bind(this);
  }
  renderStudentIdCards(student) {
    const studentsIdCards = student.map((object) => {
      const name = object.name.split(' ');
      name.forEach((element, index) => {
        name[index] = upperFirst(`${name[index].toLocaleLowerCase()} `);
      });
      const fatherName = object.fatherName.split(' ');
      fatherName.forEach((element, index) => {
        fatherName[index] = upperFirst(`${fatherName[index].toLocaleLowerCase()} `);
      });
      const addressString = object.address.replace(/,/g, ', ');
      const address = addressString.split(' ');
      address.forEach((element, index) => {
        address[index] = upperFirst(`${address[index].toLocaleLowerCase()} `);
      });
      return (
        <div key={shortId.generate()} className="student-id-cards">
          <div className="student-id-card-wrapper">
            <div className="image-id-card">
              <img src="../../LOGO.png" alt="yjsg-logo" />
            </div>
            <div>
              <h2 className="student-id-cards-header"> Young Jain Study Group</h2>
            </div>
          </div>
          <div className="card-content-wrapper">
            <div className="card-content">
              <div className="card-fields-wrapper">
                <div className="card-text">
                  <span className="card-text-bold card-text-name">Name:</span>
                  <span className="card-text-content"> {object.name}</span>
                </div>
                <div className="card-text"><span className="card-text-bold">Class:</span> {object.education}</div>
                {/* TODO: Use class room no of 2019.*/}
                <div className="card-text"><span className="card-text-bold">Room:</span> {object.classRoomNo2017}</div>
              </div>
              <div className="card-fields-wrapper">
                <div className="card-text"><span className="card-text-bold">Father Name:</span> {object.fatherName}</div>
                <div className="card-text card-text-spacing"><span className="card-text-bold">Mobile No.:</span> {object.mobile}</div>
              </div>
              <div className="card-fields-wrapper">
                <div className="card-text card-text-bus-stop card-flex">
                  <span className="card-text-bold">Bus Stop:</span>
                  <span>{object.busStop}</span>
                </div>
                <div className="card-text card-text-spacing">
                  <span className="card-text-bold">Bus No.:</span>
                  <span>{object.busNumber}</span>
                </div>
              </div>
              <div className="card-fields-wrapper">
                <div className="card-text">
                  <span className="card-text-bold">Address:</span> &nbsp;
                  <span>{object.address}</span>
                </div>
              </div>
              <div className="card-fields-wrapper">
                <div className="card-text card-text-student">
                  <span className="card-text-bold">Student Id:</span>&nbsp;
                  <span className="card-student-num">{object.studentId}</span>
                </div>
                <div className="card-text" >
                  <Barcode value={String(object.studentId)} />
                </div>
              </div>
            </div>
          </div>
          <div className="student-id-cards-footer">
            <div className="card-text">
              {/* TODO: Remove hard coded content.*/}
              <span className="card-text-bold">Coordinator name:</span> Bhagchand Jain
            </div>
            <div className="card-text">
              {/* TODO: Remove hard coded content.*/}
              <span className="card-text-bold">Coordinator contact:</span> 8435534036
            </div>
          </div>
        </div>);
    });
    const studentsTemplate = [];
    let groupOfTwoStudents = [];

    studentsIdCards.forEach((obj) => {
      if (groupOfTwoStudents.length !== 2) {
        groupOfTwoStudents.push(obj);
      } else {
        studentsTemplate.push((
          <div key={shortId.generate()} className="group-of-two-students">{groupOfTwoStudents}</div>
        ));
        groupOfTwoStudents = [];
        groupOfTwoStudents.push(obj);
      }
    },
    );
    if (!isEmpty(groupOfTwoStudents)) {
      studentsTemplate.push((<div key={shortId.generate()} className="group-of-two-students">{groupOfTwoStudents}</div>));
    }
    if (!isEmpty(studentsTemplate)) {
      return (
        <div>
          <div className="students-id-card-wrapper">
            {studentsTemplate}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>{this.renderStudentIdCards(this.props.selectedStudents)}</div>
    );
  }
}
export default StudentIdCardModal;
