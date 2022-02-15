import React from 'react'

class Button extends React.Component {

    render () {
        const { label } = this.props

        console.log(`Chamou o método render [${label}]`)
        return <button className={label}>{label}</button>
    }

    componentDidMount() {
        console.log(`Componente montado [${this.props.label}]`);
        this.props.onMount();
    }

    componentWillUnmount() {
        const { label, onUnmount } = this.props
        console.log(`Componente desmontado [${label}]`);
        onUnmount();
    }

}

export default Button