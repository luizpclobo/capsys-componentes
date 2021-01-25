import React from 'react'

import './Entrada.css'

export default class Entrada extends React.Component {

    static defaultProps = {
        focoInicial: false,
        tipo: 'text',
        habilitado: true,
    }

    state = {
        exibirLabel: false,
    }

    onChangeValor = (exibirLabel) => {
        let exibirLabelAux = !!this.props.valor || !!exibirLabel

        if (exibirLabelAux !== this.state.exibirLabel) {
            this.setState({ exibirLabel: exibirLabelAux })
        }
    }

    onChange = (evento) => {
        this.onChangeValor()

        if (!!this.props.onChange) {
            this.props.onChange(evento)
        }
    }

    onBlur = () => {
        this.onChangeValor()

        if (!!this.props.onBlur) {
            this.props.onBlur()
        }
    }

    onInput = (evento) => {
        evento.target.value = evento.target.value.toUpperCase()
    }

    render() {
        this.onChangeValor()

        return (
            <div className='entrada-base'>
                <div className={ 'entrada-campo ' + (!!this.state.exibirLabel ? 'entrada-campo-com-descricao' : 'entrada-campo-sem-descricao') }>
                    {
                        !!this.state.exibirLabel &&
                        <label className='entrada-campo-descricao'>{ this.props.descricao }</label>
                    }
                    <input
                        className='entrada'
                        type={ this.props.tipo }
                        autofocus={ this.props.focoInicial }
                        placeholder={ !this.state.exibirLabel && this.props.descricao }
                        value={ this.props.valor }
                        disabled={ !this.props.habilitado }
                        onChange={ this.onChange }
                        onBlur={ this.onBlur }
                        onInput={ this.onInput }
                    />
                </div>
            </div>   
        )
    }

}