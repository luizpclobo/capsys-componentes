import React from 'react'

import './Mensagem.css'

import Modal from '../modal'
import Botao, { BotaoRecepiente } from '../botao/Botao'
import BotaoTipo from '../botao/BotaoTipo'

export default class Mensagem extends React.Component {

    static defaultProps = {
        exibir: false,
    }

    getLista = () => {
        let lista = this.props.lista
        let listaAux = [ <div className={ 'mensagem-menu-item-vazio' }>{ 'LISTA VAZIA' }</div> ]

        if (!!lista) {
            listaAux = []

            for (let indice = 0; indice < lista.length; indice++) {
                listaAux.push(<div className={ 'mensagem-menu-item' }>{ lista[indice].id + ' - ' + lista[indice].descricao }</div>)
            }
        }

        return listaAux
    }

    eventoNao = () => {
        if (!!this.props.eventos.nao) {
            this.props.eventos.nao()
        }

        this.props.eventos.fechar()
    }

    render() {
        return ( 
            <Modal
                titulo={ this.props.titulo }
                exibir={ this.props.exibir }
                eventoFechar={ this.props.eventos.fechar }
            >       
                <div className='mensagem-menu-texto-base'>
                    <div className='mensagem-menu-texto'>
                        { this.props.texto }
                    </div>
                </div>
                {
                    !!this.props.lista &&
                    <>
                        <div className='mensagem-menu-lista-separador'/>
                        <div className='mensagem-menu-lista-base'>
                            <div className='mensagem-menu-lista'>
                                { this.getLista() }
                            </div>
                        </div>
                    </>
                }
                <div className='mensagem-menu-lista-separador'/>
                <div className='mensagem-menu-texto-base'>
                    <div className='mensagem-menu-pergunta'>
                        { this.props.pergunta }
                    </div>
                </div>
                <div className='mensagem-menu-texto-base'>
                    <div className='mensagem-menu-observacao'>
                        { this.props.observacao }
                    </div>
                </div>
                <BotaoRecepiente>
                    <Botao
                        tipo={ BotaoTipo.NAO }
                        onClick={ this.eventoNao }
                    />
                    <Botao
                        tipo={ BotaoTipo.SIM }
                        onClick={ this.props.eventos.sim }
                    />
                </BotaoRecepiente>
            </Modal>
        )
    }

}