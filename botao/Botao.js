import React from 'react'

import './Botao.css'

import BotaoTipo from './BotaoTipo'

export default class Botao extends React.Component {

    getClassName = () => {
        switch (this.props.tipo) {
            case BotaoTipo.SALVAR: return 'botao-salvar'
            case BotaoTipo.EXCLUIR: return 'botao-excluir'
            case BotaoTipo.CONTINUAR: return 'botao-continuar'
            default: return ''
        }
    }

    getDescricao = () => {
        switch (this.props.tipo) {
            case BotaoTipo.SALVAR: return 'SALVAR'
            case BotaoTipo.EXCLUIR: return 'EXCLUIR'
            case BotaoTipo.CONTINUAR: return 'CONTINUAR'
            default: return ''
        }
    }

    render() {
        return (
            <div className={ 'botao-base' }>
                <div
                    className={ 'botao ' + this.getClassName() }
                    onClick={ this.props.onClick }
                >
                    <div className={ 'botao-descricao' } >
                        <p>{ this.getDescricao() }</p>
                    </div>
                </div>
            </div>
        )
    }

}