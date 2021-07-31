import Api from '@app/Api';
import Auth from '@app/Auth';
import UseText from '@app/UseText';
import { Cell, Grid, Panel, ViewTitle, Page } from '@components';
import React, { Component } from 'react';

export default class ChangePasswordView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            confirm: '',
            isInvalidInput: true,
            oldPass: '',
            curpass: '',
            newpass: '',
            hidden: true,
            show: true,
            showconf: true,
            error: false,
            isEnable: false,
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleValidate = this.handleValidate.bind(this);
        this.showpassword = this.showpassword.bind(this);
        this.showNewPassword = this.showNewPassword.bind(this);
        this.showConfirmPassword = this.showConfirmPassword.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
    }

    handleCurrentPassword(e) {
        const input = e.target;
        this.setState({ [input.name]: input.value });
    }

    handleOnChange(e) {
        const input = e.target;

        let notValid = /\s/;
        let mediumRegex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
        );
        let strongRegex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

        if (!notValid.test(input.value)) {
            if (strongRegex.test(input.value)) {
                this.setState({ text: 'PASSWORD_STRONG', error: false });
            } else if (mediumRegex.test(input.value)) {
                this.setState({ text: 'Password medium', error: false});
            } else {
                this.setState({ text: 'PASSWORD_STRENGTH_TIP', error: true });
            }
        } else {
            this.setState({ text: 'SPACES_NOT_ALLOWED', error: true });
        }
        this.setState({ [input.name]: input.value });
    }

    handleValidate(e) {
        const input = e.target;
        let notValid = /\s/;
        if (!notValid.test(input.value)) {
            if (this.state.newpass === input.value) {
                this.setState({ confirm: 'BOTH_PASSWORDS_MATCH' });
            }
        }else{
            this.setState({ confirm: 'SPACES_NOT_ALLOWED', error: true });
        }
        this.setState({ [input.name]: input.value });
    }

    validatePassword() {
        let mediumRegex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
        );
        let notValid = /\s/;
        mediumRegex.test(this.state.confpass);
        if (!notValid.test(this.state.confpass) && !notValid.test(this.state.newpass) && this.state.newpass === this.state.confpass && mediumRegex.test(this.state.confpass)) {
            this.setState({ confirm: 'BOTH_PASSWORDS_MATCH' });
            return true;
        }
        this.setState({ confirm: "ENTERED_PASSWORD_DONT_MATCH" });
        return false;
    }

    showpassword(event) {
        const target = event.target;
        const name = target.getAttribute('name');
        this.setState({ hidden: !this.state.hidden });
    }

    showNewPassword() {
        this.setState({ show: !this.state.show });
    }

    showConfirmPassword() {
        this.setState({ showconf: !this.state.showconf });
    }

    handleChangePassword() {
        let isValid = this.validatePassword();

        let data = {
            id: sessionStorage.id,
            oldpass: this.state.curpass,
            password: this.state.confpass,
        };

        if (isValid) {
            Api.ResetPassword(sessionStorage.id, data, Auth.getAuthorizationHeader())
                .then((res) => {
                    this.setState({
                        confirm: res.message,
                        newpass: '',
                        confpass: '',
                        curpass: '',
                        text: '',
                        error: false,
                    });
                })
                .catch((e) => {
                    this.setState({ confirm: e.message });
                });
        } else {
            this.setState({ confirm: 'ENTERED_PASSWORD_DONT_MATCH' });
        }
    }

    render() {
        let message = this.state.text;
        let username = sessionStorage.email;
        const error = this.state.error;
        return (
            <Page title='CHANGE_PASSWORD'>
                <br/>
                <Grid page='changepass'>
                    <Panel className='profile-border'>
                        <div component='changepass'>
                            <Grid type='x' className='grid-margin-x form-profile'>
                                <Cell small='12' className='user-profile'>
                                    <UseText i18n="USERNAME" />: <span>{username}</span>
                                </Cell>
                                <Cell className='input-group' small='12'>
                                    <div className='input-view input-field'>
                                        <label className='active'> <UseText i18n="CURRENT_PASSWORD" /></label>
                                        <span>
                                            <i
                                                className={`prs pr-eye${
                                                    this.state.hidden ? '' : '-slash'
                                                } pr-lg inside`}
                                                name='currentpass'
                                                onClick={this.showpassword}
                                            />
                                        </span>
                                        <input
                                            placeholder='12345678'
                                            id='curpass'
                                            autoComplete="password"
                                            name='curpass'
                                            value={this.state.curpass}
                                            type={this.state.hidden ? 'password' : 'text'}
                                            className='validate'
                                            onChange={this.handleCurrentPassword}
                                        />
                                    </div>
                                </Cell>
                                <Cell className='input-group' small='12'>
                                    <div className='input-view input-field'>
                                        <label htmlFor='newpass' className='active'>
                                            <UseText i18n="NEW_PASSWORD" />
                                        </label>
                                        <span>
                                            <i
                                                className={`prs pr-eye${this.state.show ? '' : '-slash'} pr-lg inside`}
                                                name='currentpass'
                                                onClick={this.showNewPassword}
                                            />
                                        </span>
                                        <input
                                            id='newpass'
                                            name='newpass'
                                            autoComplete="off"
                                            value={this.state.newpass}
                                            type={this.state.show ? 'password' : 'text'}
                                            className='validate'
                                            onChange={this.handleOnChange}
                                        />
                                    </div>
                                    <span style={{ color: error ? "darkred" : '' }}> <UseText i18n={this.state.text}/></span>
                                </Cell>
                                <Cell className='input-group' small='12'>
                                    <div className='input-field input-view'>
                                        <label htmlFor='confpass' className='active'>
                                            <UseText i18n="CONFIRM_NEW_PASSWORD" />
                                        </label>
                                        <span>
                                            <i
                                                className={`prs pr-eye${
                                                    this.state.showconf ? '' : '-slash'
                                                } pr-lg inside`}
                                                name='currentpass'
                                                onClick={this.showConfirmPassword}
                                            />
                                        </span>
                                        <input
                                            id='confpass'
                                            name='confpass'
                                            type={this.state.showconf ? 'password' : 'text'}
                                            className='validate'
                                            value={this.state.confpass || ''}
                                            onChange={this.handleValidate}

                                        />
                                    </div>
                                    <span> <UseText i18n={this.state.confirm} /> </span>
                                </Cell>
                                <Cell small='12'>
                                    <center>
                                        <button className='button' disabled={false} onClick={this.handleChangePassword}>
                                            <UseText i18n="CHANGE_PASSWORD" />
                                        </button>
                                    </center>
                                </Cell>
                            </Grid>
                        </div>
                    </Panel>
                </Grid>
            </Page>
        );
    }
}
