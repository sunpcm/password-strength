import React, { Component } from 'react';
import zxcvbn from 'zxcvbn'

class PasswordStrength extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            isValid: false,
            password: '',
        }
    }

    componentDidMount() {
        const { defaultValue = [] } = this.props;

        if (defaultValue.length > 0) {
            this.setState({ password: defaultValue }, this.handleChange);
        }
    }


    isTooShort(password, minLength) {
        return password.length < minLength;
    }

    handleChange() {
        const { changeCallback, minScore, userInputs, minLength } = this.props;
        const password = this.reactPasswordStrengthInput.value;

        let score = 0;
        let result = null;

        // always sets a zero score when min length requirement is not met
        // avoids unnecessary zxcvbn computations (CPU intensive)
        if (this.isTooShort(password, minLength) === false) {
            result = zxcvbn(password, userInputs);
            score = result.score;
        }

        this.setState({
            isValid: score >= minScore,
            password,
            score,
        }, () => {
            if (changeCallback !== null) {
                changeCallback(this.state, result);
            }
        });
    }

    render() {
        return (
            <div id="password-strength" className="password-strength">
                <input className="password-input"
                    type="password"
                    placeholder="input your password"
                />
                <div className="password-strength-bar"></div>
                <span className="password-strength-info">weak</span>
            </div>
        );
    }
}
export default PasswordStrength
