import React from 'react'

import './Botao.css'

import BotaoTipo from './BotaoTipo'

export class BotaoRecepiente extends React.Component {

    render() {
        return (
            <div className='botao-recipiente'>
                { this.props.children }
            </div>
        )
    }

}

export default class Botao extends React.Component {

    static defaultProps = {
        ativo: true,
    }

    getClassName = () => {
        if (!this.props.ativo) {
            return 'botao-desabilitado'
        }

        switch (this.props.tipo) {
            case BotaoTipo.SALVAR:
            case BotaoTipo.SIM:
                return 'botao-sim'
            case BotaoTipo.EXCLUIR:
            case BotaoTipo.NAO:
                return 'botao-nao'
            case BotaoTipo.CONTINUAR: return 'botao-continuar'
            default: return ''
        }
    }

    getDescricao = () => {
        switch (this.props.tipo) {
            case BotaoTipo.SALVAR: return 'SALVAR'
            case BotaoTipo.EXCLUIR: return 'EXCLUIR'
            case BotaoTipo.CONTINUAR: return 'CONTINUAR'
            case BotaoTipo.SIM: return 'SIM'
            case BotaoTipo.NAO: return 'NÃO'
            default: return ''
        }
    }

    getOnClick = () => {
        if (!!this.props.ativo) {
            this.props.onClick()
        }
    }

    render() {
        return (
            <div className={ 'botao-base ' }>
                <div
                    className={ 'botao ' + this.getClassName() }
                    onClick={ this.getOnClick }
                >
                    <div className={ 'botao-descricao' } >
                        <p>{ this.getDescricao() }</p>
                    </div>
                </div>
            </div>
        )
    }

}