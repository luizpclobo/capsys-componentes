import React from 'react'

import Botao from '../../botao'
import BotaoTipo from '../../botao/BotaoTipo'

import Notificacao from '../../notificacao'
import NotificacaoTipo from '../../notificacao/NotificacaoTipo'

import './Opcao.css'

export default class Opcao extends React.Component {

    static defaultProps = {
        eventos: {}
    }

    eventoSalvar = async () => {
        if (this.props.eventos.eventoSalvar) {
            let dados = await this.props.eventos.eventoSalvar()

            if (!!dados) {
                Notificacao.criar(NotificacaoTipo.SUCESSO, 'Salvo com sucesso.')
            } else {
                Notificacao.criar(NotificacaoTipo.FALHA, 'Falha ao salvar.')
            }
        }

        if (this.props.eventos.eventoAposSalvar) {
            await this.props.eventos.eventoAposSalvar()
        }
    }

    eventoExcluir = async () => {
        if (this.props.eventos.eventoExcluir) {
            let dados = await this.props.eventos.eventoExcluir()

            if (!!dados) {
                Notificacao.criar(NotificacaoTipo.SUCESSO, 'Excluído com sucesso.')
            } else {
                Notificacao.criar(NotificacaoTipo.FALHA, 'Falha ao excluir.')
            }
        }

        if (this.props.eventos.eventoAposExcluir) {
            await this.props.eventos.eventoAposExcluir()
        }
    }

    render() {
        return (
            <div className='opcao'>
                <Notificacao/>
                <Botao
                    tipo={ BotaoTipo.EXCLUIR }
                    onClick={ this.eventoExcluir }
                />
                <Botao
                    tipo={ BotaoTipo.SALVAR }
                    onClick={ this.eventoSalvar }
                />
            </div>
        )
    }

}