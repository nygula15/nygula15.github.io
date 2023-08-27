import React from 'react';
import { Bttn } from './Bttn';
import { Input } from './Input';
import { ClearButton } from './ClearButton';
import * as math from 'mathjs';

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ''
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyboardInput);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyboardInput);
    }

    handleKeyboardInput = (event) => {
        const { key } = event;

        // Check for valid keyboard input
        if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
            this.addToInput(key);
        } else if (key === 'Enter') {
            this.handleEqual();
        }
    };

    addToInput = (val) => {
        this.setState((prevState) => ({
            input: prevState.input + val
        }));
    };

    handleEqual = () => {
        this.setState((prevState) => ({
            input: math.evaluate(prevState.input)
        }));
    };

    handleSin = () => {
        this.setState((prevState) => ({
            input: math.sin(prevState.input)
        }));
    };

    handleCos = () => {
        this.setState((prevState) => ({
            input: math.cos(prevState.input)
        }));
    };

    render() {
        return (
            <div className="calc-wrapper">
                <Input input={this.state.input}></Input>
                <div className="row">
                    <Bttn handleClick={this.handleSin}>Sin</Bttn>
                    <Bttn handleClick={this.handleCos}>Cos</Bttn>
                    <ClearButton handleClear={() => this.setState({ input: '' })}>CE</ClearButton>
                </div>
                <div className="row">
                    <Bttn handleClick={this.addToInput}>7</Bttn>
                    <Bttn handleClick={this.addToInput}>8</Bttn>
                    <Bttn handleClick={this.addToInput}>9</Bttn>
                    <Bttn handleClick={this.addToInput}>/</Bttn>
                </div>
                <div className="row">
                    <Bttn handleClick={this.addToInput}>4</Bttn>
                    <Bttn handleClick={this.addToInput}>5</Bttn>
                    <Bttn handleClick={this.addToInput}>6</Bttn>
                    <Bttn handleClick={this.addToInput}>*</Bttn>
                </div>
                <div className="row">
                    <Bttn handleClick={this.addToInput}>1</Bttn>
                    <Bttn handleClick={this.addToInput}>2</Bttn>
                    <Bttn handleClick={this.addToInput}>3</Bttn>
                    <Bttn handleClick={this.addToInput}>+</Bttn>
                </div>
                <div className="row">
                    <Bttn handleClick={this.addToInput}>.</Bttn>
                    <Bttn handleClick={this.addToInput}>0</Bttn>
                    <Bttn handleClick={this.handleEqual}>=</Bttn>
                    <Bttn handleClick={this.addToInput}>-</Bttn>
                </div>
            </div>
        );
    }
}

export default Calculator;
