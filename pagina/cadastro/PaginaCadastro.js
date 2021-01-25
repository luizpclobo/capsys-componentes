import React from 'react'

import Pagina from '../Pagina'

import Botao from '../../botao'
import BotaoTipo from '../../botao/BotaoTipo'

export default class PaginaCadastro extends React.Component {

    getLocalizacao = () => {
        let descricao = [ this.props.localizacao.descricao, 'Cadastro' ] 
        let local = [ this.props.localizacao.local, this.props.localizacao.local + '/cadastro' ]

        if (!!this.props.localizacao.id) {
            descricao.push(this.props.localizacao.id)
            local.push(this.props.localizacao.local + '/cadastro/' + this.props.localizacao.id)
        }

        return {
            descricao,
            local
        }
    }

    eventoSalvar = () => {
        if (this.props.eventoSalvar) {
            this.props.eventoSalvar()
        }

        if (this.props.eventoAposSalvar) {
            this.props.eventoAposSalvar()
        }
    }

    render = () => {
        return (
            <Pagina localizacao={ this.getLocalizacao() }>
                { this.props.children }
                <Botao
                    tipo={ BotaoTipo.SALVAR }
                    onClick={ this.eventoSalvar }
                />
            </Pagina>
        )
    }

}