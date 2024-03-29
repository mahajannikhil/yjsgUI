import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import moment from 'moment';

import StudentIdCardModal from './StudentIdCardModal';
import MarkSelectedStudentAttendance from './MarkSelectedStudentAttendance';
import MarkOptInOrOptOutButton from './MarkOptInOrOptOutButton';
import UpdateIdCardStatusSelectedStudents from './UpdateIdCardStatusSelectedStudents';

/**
 * SelectedStudentsActionWrapper render Export, Print Now, Print Later, Mark as Present and
 * Mark optIn/optOut buttons.
 * @type {Class}
 */
class SelectedStudentsActionWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printOptionIsOpen: false,
    };
    this.openPrintOption = this.openPrintOption.bind(this);
    this.printCards = this.printCards.bind(this);
  }

  /**
   * printCards method call window.print() method to print students
   * Id cards.
   */
  printCards() {
    window.print();
  }

  /**
   * openPrintOption method open or close the print window.
   */
  openPrintOption() {
    this.setState({ printOptionIsOpen: !this.state.printOptionIsOpen });
  }

  /**
   * renderExportClassName method return the className
   * Export button as per students selected or not.
   * @return {string} className
   */
  renderExportClassName() {
    if (isEmpty(this.props.selectedStudents)) {
      return 'disable-link';
    }
    return 'export';
  }
  /**
   * renderPrintNowClassName method return the className
   * Print Now button as per students selected or not.
   * @return {string} className
   */
  renderPrintNowClassName() {
    if (isEmpty(this.props.selectedStudents)) {
      return 'disable-link-button-new';
    }
    return 'linkButton';
  }
  render() {
    const filterHeader = this.props.metaData.headerConfig.filter(obj =>
      obj.excludeFromExport !== true);
    const header = filterHeader.map(item =>
      ({ label: item.label, key: item.key, disable: item.disable }),
    );
    return (
      <div>
        <div className="id-card-wrapper print-media-none">
          <div className="selected-student-buttons">
            <div className="buttonContainer">
              <CSVLink
                headers={header}
                data={this.props.selectedStudents}
                className={this.renderExportClassName()}
                filename={`StudentData-${moment().format('DD-MM-YYYY-LT')}.csv`}
              >
                <i className="fa fa-download card-icon" />Export
              </CSVLink>
            </div>
            <div className="buttonContainer">
              <button className={this.renderPrintNowClassName()} onClick={this.printCards}>
                <i className="fa fa-print card-icon" />Print Now
              </button>
            </div>
            <UpdateIdCardStatusSelectedStudents
              selectedStudents={this.props.selectedStudents}
            />
            <MarkSelectedStudentAttendance
              selectedStudents={this.props.selectedStudents}

            />
            <MarkOptInOrOptOutButton
              selectedStudents={this.props.selectedStudents}
              clearSelectedStudents={this.props.clearSelectedStudents}
            />
          </div>
        </div>
        <StudentIdCardModal
          printOptionIsOpen={this.state.printOptionIsOpen}
          selectedStudents={this.props.selectedStudents}
        />
      </div>
    );
  }
}

SelectedStudentsActionWrapper.propTypes = {
  selectedStudents: PropTypes.array,
  metaData: PropTypes.object,
  clearSelectedStudents: PropTypes.func,
};

SelectedStudentsActionWrapper.defaultProps = {
  selectedStudents: [],
  metaData: {},
  clearSelectedStudents: () => {},
};

export default SelectedStudentsActionWrapper;
