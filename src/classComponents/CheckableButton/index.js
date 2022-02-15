import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import './index.css'

class CheckableButton extends Component {

    state = {
        selected: true
    }

    toggleSelect = () => {
        this.setState(({ selected }) => ({
            selected: !selected
        }))    
    }

    render () {
        const { label } = this.props
        const { selected } = this.state

        let className = 'btn-checkable'

        if (selected) {
            className += ' --is-selected'
        }

        return (
            <div>
                <button
                    className={className}
                    onClick={this.toggleSelect}>
                        {
                            selected
                            ? <AiOutlineCheckCircle />
                            : <AiOutlineCloseCircle />
                        }                    
                    {label}
                </button>
            </div>
        )
    }

}

CheckableButton.propTypes = {
    label: PropTypes.string.isRequired,
}

export default CheckableButton