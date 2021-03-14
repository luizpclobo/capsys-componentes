import React from 'react'

import Botao, { BotaoRecepiente } from '../../botao/Botao'
import BotaoTipo from '../../botao/BotaoTipo'

import './Opcao.css'

export default class Opcao extends React.Component {

    static defaultProps = {
        eventos: {},
        botoes: {
            excluir: {
                ativo: true
            },
            salvar: {
                ativo: true
            }
        }
    }

    eventoSalvar = async () => {
        if (!!this.props.eventos.salvar) {
            return await this.props.eventos.salvar()
        }
    }

    eventoExcluir = async () => {
        if (!!this.props.eventos.excluir) {
            return await this.props.eventos.excluir()
        }
    }

    render() {
        return (
            <BotaoRecepiente>
                <Botao
                    ativo={ this.props.botoes.excluir.ativo }
                    tipo={ BotaoTipo.EXCLUIR }
                    onClick={ this.eventoExcluir }
                />
                <Botao
                    ativo={ this.props.botoes.salvar.ativo }
                    tipo={ BotaoTipo.SALVAR }
                    onClick={ this.eventoSalvar }
                />
            </BotaoRecepiente>
        )
    }

}