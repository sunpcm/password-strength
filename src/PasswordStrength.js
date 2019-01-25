import React, { Component } from 'react';
import zxcvbn from 'zxcvbn'

class PasswordStrength extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 'none',
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
        console.log(password.length)
        return password.length < minLength;
    }

    handleChange(e) {

        const { changeCallback, minScore, userInputs, minLength } = this.props;
        const password = e.target.value//this.reactPasswordStrengthInput.value;

        let score = 0;
        let result = null;
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

        const { score, password } = this.state
        const { scoreWords, minLength, } = this.props
        const strengthDesc = (
            this.isTooShort(password, minLength)
                ? 'short'
                : scoreWords[score]
        );

        return (
            <div id="password-strength" className={`password-strength strength-${score}`}>
                <input className="password-input"
                    type="password"
                    placeholder="input your password"
                    onChange={(e) => this.handleChange(e)}
                />
                <div className="password-strength-bar"></div>
                <span className="password-strength-info">{strengthDesc}</span>
            </div>
        );
    }
}
export default PasswordStrength
