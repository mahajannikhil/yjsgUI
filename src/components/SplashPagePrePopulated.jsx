/* This component is deprecated. Please do not use this component*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';

import LinkButton from './commonComponents/LinkButton';
import Button from './commonComponents/Button';
import InputField from './formComponents/InputField';
import { fetchStudentData, setAdminCredentialsAction, setStudentCredentials, setAdminLoginStateAction } from '../actions/studentRegistrationActions';
import yjsgLogo from '../assets/yjsgLogo.png';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  stateOfAdminLogin,
  getUserId,
  getUserSecretKey,
} from '../reducers/studentRegistrationReducer';
import {
  adminId,
  adminPassword,
  yjsgHeader,
  eventDate,
  eventVenue,
  goBackBtnText,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
  loginBtnText,
  adminLoginBtnText,
  invalidAdminMsg,
} from '../utils/yjsgConstants';
import { setRegistrationData } from '../utils/registrationFormUtils';

// FixMe: Add missing propTypes and defaultProps.
//  Fix EsLint issues.
//  This component is unnecessary. Please use splash page to show pre-populated data and remove this component
class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCorrection: false,
      isAdmin: false,
      credentials: {},
      admin: {},
      isURLParams: false,
      adminLoginState: false,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage: false,
    };

    // FIXME: Use arrow functions to avoid binding.
    this._enableEditInfo = this.enableEditInfo.bind(this);
    this._disableEditInfo = this.disableEditInfo.bind(this);
    this._enableAdminLogin = this.enableAdminLogin.bind(this);
    this._disableAdminLogin = this.disableAdminLogin.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
    // this._fetchStudentById = this.fetchStudentById.bind(this);
    this._setAdminLogin = this.setAdminLogin.bind(this);
    this.checkAdminCredential = this.checkAdminCredential.bind(this);

    // FIXME: Commented code?
    // this.checkRegisteredStudentCredential = this.checkRegisteredStudentCredential.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      credentials: {
        studentId: nextProps.studentId,
        secretKey: nextProps.secretKey,
      },
    });
  }

  componentDidMount() {
    this.setState({
      credentials: {
        studentId: this.props.studentId,
        secretKey: this.props.secretKey,
      },
    });
  }

  // FIXME: Rename it to enableStudentInfoCorrectionButtons
  enableEditInfo() {
    this.setState({
      isCorrection: true,
    });
  }

  // FIXME: Rename it to enableAdminLoginButtons
  enableAdminLogin() {
    this.setState({
      isAdmin: true,
    });
  }

  // FIXME: Rename it to disableAdminLoginButtons
  disableAdminLogin() {
    this.setState({
      isAdmin: false,
    });
  }

  // FIXME: Rename it to disableStudentInfoCorrectionButtons
  disableEditInfo() {
    this.setState({
      isCorrection: false,
    });
  }
  // FIXME: Rename it to a name specific to adminScreenRedirection
  checkAdminCredential() {
    if (!this.props.adminLoginState) {
      const {
        id,
        password,
      } = this.props;
      if (this.state.adminCredentialErrorMessage) {
        if (id !== adminId || password !== adminPassword) {
          return (
            <div className="errorPopupContainer">
              <h5>{invalidAdminMsg}</h5>
            </div>
          );
        }
        this.props.setAdminLoginStateAction(true);
        return <Switch><Redirect to="/student-search" /></Switch>;

      }
      return null;
    }
    return <Switch><Redirect to="/student-search" /></Switch>;

  }
  /* checkRegisteredStudentCredential() {
    if (this.state.registeredStudentCredentialErrorMessage) {
      if ((!this.props.studentData || !this.props.isFetched) && !this.props.isLoading) {
        return (<div>
          <h5>{invalidIdMessage}</h5>
        </div>);
      } else if (this.props.studentData && this.props.isFetched) {
        return (
          <div>
            <Redirect to={'/studentCorrection'}/>
          </div>
        )
      }
    }
    return null;
  }*/
  setAdminLogin() {
    this.setState({
      adminLoginState: true,
      adminCredentialErrorMessage: true,
    });
    this.props.setAdminCredentialsAction(this.state.admin.adminId, this.state.admin.adminPassword);
  }

  /* fetchStudentById () {
    this.props.setStudentCredentials(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.props.fetchStudentData(this.state.credentials.studentId,
      this.state.credentials.secretKey);
    this.setState({
      registeredStudentCredentialErrorMessage: true,
    });
  };*/

  handleInputChange(value, name) {
    const updatedData = extend(cloneDeep(this.state.credentials),
      setRegistrationData(value, name));

    const adminData = extend(cloneDeep(this.state.admin),
      setRegistrationData(value, name));

    this.setState({
      credentials: updatedData,
      admin: adminData,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage: false,
    });
  }

  /* renderRegistrationCorrectionFields() {
    return (
      <div>
        <InputField
          type={'number'}
          name={'studentId'}
          label={'आई.डी. नं.'}
          placeholder={'अपना आई.डी. नं. दर्ज करें'}
          onInputChange={this._handleInputChange}
          value={this.state.credentials.studentId}
        />
        <InputField
          type={'text'}
          name={'secretKey'}
          label={'सीक्रेट कोड'}
          placeholder={'अपना सीक्रेट कोड दर्ज करें'}
          onInputChange={this._handleInputChange}
          value={this.state.credentials.secretKey}
        />
        {this.checkRegisteredStudentCredential()}
        <div className="button-wrapper">
          <Button
            buttonText={goBackBtnText}
            onClick={this._disableEditInfo}
          />
          <Button
            buttonText={viewEditInfoBtnText}
            onClick={this._fetchStudentById}
          />
        </div>
      </div>
    )
  }*/

  renderAdminLoginFields() {
    return (
      <div>
        <InputField
          type="text"
          name="adminId"
          label="Admin ID"
          placeholder="Enter Admin ID"
          onInputChange={this._handleInputChange}
          value={this.state.admin.adminId}
        />
        <InputField
          type="password"
          name="adminPassword"
          label="Admin Password"
          placeholder="Enter Admin Password"
          onInputChange={this._handleInputChange}
          value={this.state.admin.adminPassword}
        />
        {this.checkAdminCredential()}
        <div className="button-wrapper">
          <Button
            buttonText={goBackBtnText}
            onClick={this._disableAdminLogin}
          />
          <Button
            buttonText={loginBtnText}
            onClick={this._setAdminLogin}
          />
        </div>
      </div>
    );
  }

  renderLoginField() {
    if (this.state.isCorrection) {
      return <Switch><Redirect to="/student-login" /></Switch>;
    } else if (this.state.isAdmin) {
      return this.renderAdminLoginFields();
    }

    return (
      <div>
        <Button
          buttonText={alreadyRegisteredBtnText}
          onClick={this._enableEditInfo}
        />
        <LinkButton
          buttonText={newRegistrationBtnText}
          linkPath="/studentRegister"
        />
        <Button
          buttonText={adminLoginBtnText}
          onClick={this._enableAdminLogin}
        />
      </div>
    );

  }

  render() {
    return (
      <div className="landing-page-block">
        <div className="landing-page-container">
          <h2 className="student-heading">{yjsgHeader}</h2>
        </div>
        <div className="landing-page-wrapper">
          <div className="landing-page-content">
            <div className="yjsg-event-info">
              <h5 className="primary-color">{eventDate}</h5>
              <h5 className="header-text">{eventVenue}</h5>
            </div>
            <div className="landing-page-logo">
              <img src={yjsgLogo} alt="yjsg logo" />
            </div>
            <div className="landing-page-button-container">
              {this.renderLoginField()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SplashPage.propTypes = {
  fetchStudentData: PropTypes.func,
  setStudentCredentials: PropTypes.func,
};

SplashPage.defaultProps = {
  fetchStudentData: () => {},
  setStudentCredentials: () => {},
};

const mapStateToProps = state => ({
  studentId: getUserId(state),
  id: getAdminId(state),
  secretKey: getUserSecretKey(state),
  password: getAdminPassword(state),
  isLoading: isLoading(state),
  searchResults: getSearchResults(state),
  adminLoginState: stateOfAdminLogin(state),
  studentData: getStudent(state),
  isFetched: isFetched(state),
});

export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
})(SplashPage);
