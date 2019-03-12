import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import * as shortId from 'shortid';

import {
  resetIsUpdateIdCardStatusSuccessAction,
  updateIdCardStatusSelectedStudentsAction,
} from '../actions/studentRegistrationActions';
import {
  getSecretKey,
  isUpdateIdCardStatusSuccess,
  isUpdateIdCardStatusFailed,
} from '../reducers/studentRegistrationReducer';
import {
  ID_CARD_PRINT_STATUS_FOR_SELECTED_STUDENTS_LABEL,
} from '../utils/labelConstants';
import {
  UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE,
  UPDATED_ID_CARD_STATUS_FAILED_MESSAGE,
} from '../utils/messagesConstants';

const customUpdateIdCardStatusSelectedStudentsModalStyles = {
  overlay: {
    zIndex: '999',
    backgroundColor: 'rgba(21, 20, 20, 0.75)',
  },
  content: {
    top: '50%',
    position: 'absolute',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(205, 68, 3)',
    boxShadow: 'rgb(99, 99, 99) 0px 2.3px 3px 0px',
    padding: '0px !important',
    marginRight: '-50%',
    width: '45%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  },
};

class UpdateIdCardStatusSelectedStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsId: [],
      selectedCardOption: '',
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: false,
    };
    this.openUpdateIdCardStatusSelectedStudentsModal = this.openUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.closeUpdateIdCardStatusSelectedStudentsModal = this.closeUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.onClickRadioButton = this.onClickRadioButton.bind(this);
    this.renderUpdateIdCardStatusSelectedStudentsModal = this.renderUpdateIdCardStatusSelectedStudentsModal.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.filterIdsOfStudents = this.filterIdsOfStudents.bind(this);
    this.renderIdCardStatusButtonClassName = this.renderIdCardStatusButtonClassName.bind(this);
    this.renderSubmitButtonClassName = this.renderSubmitButtonClassName.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  openUpdateIdCardStatusSelectedStudentsModal() {
    this.setState({
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: true,
    });
    this.filterIdsOfStudents();
  }
  closeUpdateIdCardStatusSelectedStudentsModal() {
    this.setState({
      isUpdateSelectedStudentsOptInOrOptOutModalOpen: false,
      selectedCardOption: '',
    });
    this.props.resetIsUpdateIdCardStatusSuccessAction();
  }
  renderSubmitButtonClassName() {
    if (isEmpty(this.state.selectedCardOption)) {
      return 'popup-buttons-disable';
    }

    return 'display-inline linkButton btn-upload';

  }
  filterIdsOfStudents() {
    const Ids = this.props.selectedStudents.map(student => String(student.studentId));
    this.setState({
      studentsId: Ids,
    });
  }
  renderIdCardStatusButtonClassName() {
    if (isEmpty(this.props.selectedStudents)) {
      return 'disable-link-button-new';
    }

    return 'linkButton';

  }
  renderMessage() {
    if (this.props.isUpdateIdCardStatusSuccess) {
      return (
        <div className="success-block">
          <span>{UPDATED_ID_CARD_STATUS_SUCCESS_MESSAGE}</span>
        </div>
      );
    } else if (!this.props.isUpdateIdCardStatusSuccess && this.props.isUpdateIdCardStatusFailed) {
      return (
        <div className="upload-message-wrapper">
          <div className="failure-block">
            <span>
              {UPDATED_ID_CARD_STATUS_FAILED_MESSAGE}
            </span>
          </div>
        </div>
      );
    }
    return null;
  }
  onClickRadioButton(event) {
    this.setState({
      selectedCardOption: { 'printStatus': event.target.value },
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    const { secretKey } = this.props;
    const selectedStudentsId = this.state.studentsId;
    const IdCardStatus = this.state.selectedCardOption;
    this.props.updateIdCardStatusSelectedStudentsAction({ secretKey, selectedStudentsId, IdCardStatus });
  }
  renderUpdateIdCardStatusSelectedStudentsModal() {
    if (this.state.isUpdateSelectedStudentsOptInOrOptOutModalOpen) {
      return (
        <Modal
          isOpen={this.state.isUpdateSelectedStudentsOptInOrOptOutModalOpen}
          onRequestClose={this.closeUpdateIdCardStatusSelectedStudentsModal}
          style={customUpdateIdCardStatusSelectedStudentsModalStyles}
          contentLabel="Column Options"
          overlayLabel="Overlay Options"
          className="custom-modal"
          ariaHideApp={false}
        >
          <div className="column-group-wrapper">
            <form onSubmit={this.onFormSubmit}>
              <div className="column-modal">
                <h1 className="column-modal-container">{ID_CARD_PRINT_STATUS_FOR_SELECTED_STUDENTS_LABEL}</h1>
              </div>
              <div className="column-content-modal column-wrapper">
                <div className="selected-student-heading">
                  <span>Selected Students Id: </span>
                  <div className="selected-student-wrapper-id">
                    {
                      this.state.studentsId.map(student =>
                        <span key={shortId.generate()} className="selected-students-Id">{student}</span>)
                    }
                  </div>
                </div>
                <div className="advance-input-radio advance-input-print-later">
                  <div className="input-radio-container">
                    <input type="radio" name="IdCardStatus" value="Y" onClick={this.onClickRadioButton} />
                    <label htmlFor="Reprint">Reprint</label>
                  </div>
                  <div className="input-radio-container">
                    <input type="radio" name="IdCardStatus" value="N" onClick={this.onClickRadioButton} />
                    <label htmlFor="NotPrint">Not Print</label>
                  </div>
                </div>
                {this.renderMessage()}
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button
                    className="button-modal button-close"
                    onClick={this.closeUpdateIdCardStatusSelectedStudentsModal}
                  >Close
                  </button>
                  <button className={this.renderSubmitButtonClassName()} type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      );
    }
  }
  render() {
    return (
      <div className="buttonContainer">
        <button
          className={this.renderIdCardStatusButtonClassName()}
          onClick={this.openUpdateIdCardStatusSelectedStudentsModal}
        >
          <i className="fa fa-print card-icon" />Print Later
        </button>
        {this.renderUpdateIdCardStatusSelectedStudentsModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secretKey: getSecretKey(state),
  isUpdateIdCardStatusFailed: isUpdateIdCardStatusFailed(state),
  isUpdateIdCardStatusSuccess: isUpdateIdCardStatusSuccess(state),
});

export default connect(mapStateToProps, {
  resetIsUpdateIdCardStatusSuccessAction,
  updateIdCardStatusSelectedStudentsAction,
}, null, { pure: false })(UpdateIdCardStatusSelectedStudents);

