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
        valida: false,
    }

    getClassNameCampo = () => {
        return (
            'entrada-campo ' +
            (!!this.state.exibirLabel ? 'entrada-campo-com-descricao' : 'entrada-campo-sem-descricao')
        )
    }

    getClassNameEntrada = () => {
        return (
            'entrada ' +
            (!this.state.valida ? 'entrada-nao-valida' : '')
        )        
    }

    eventoAlteracaoValor = () => {
        let exibirLabelAux = !!this.props.valor

        if (exibirLabelAux !== this.state.exibirLabel) {
            this.setState({ exibirLabel: exibirLabelAux })
        }
    }

    eventoAlteracao = (evento) => {
        this.eventoAlteracaoValor()

        if (!!this.props.eventoAlteracao) {
            this.props.eventoAlteracao(evento.target.value)
        }
    }

    eventoSair = () => {
        this.eventoAlteracaoValor()

        if (!!this.props.eventoSair) {
            this.props.eventoSair()
        }
    }

    eventoEntrada = (evento) => {
        evento.target.value = evento.target.value.toUpperCase()
    }

    eventoValidar = () => {
        if (!!this.props.eventoValidar) {
            let validaAux = !!this.props.eventoValidar(this.props.valor)

            if (validaAux !== this.state.valida) {
                this.setState({ valida: validaAux })
            }
        }
    }

    render() {
        this.eventoAlteracaoValor()
        this.eventoValidar()

        return (
            <div className='entrada-base'>
                <div className={ this.getClassNameCampo() }>
                    {
                        !!this.state.exibirLabel &&
                        <label className='entrada-campo-descricao'>{ this.props.descricao }</label>
                    }
                    <input
                        className={ this.getClassNameEntrada() }
                        type={ this.props.tipo }
                        autofocus={ this.props.focoInicial }
                        placeholder={ !this.state.exibirLabel && this.props.descricao }
                        value={ this.props.valor }
                        disabled={ !this.props.habilitado }
                        onChange={ this.eventoAlteracao }
                        onBlur={ this.eventoSair }
                        onInput={ this.eventoEntrada }
                    />
                </div>
            </div>   
        )
    }

}