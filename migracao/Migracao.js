import React from 'react'

import './Migracao.css'

import Modal from '../modal'
import Botao, { BotaoRecepiente } from '../botao/Botao'
import BotaoTipo from '../botao/BotaoTipo'

const defaultState = {
    item: { 
        id: 0,
        descricao: 'NADA SELECIONADO'
    }  
}

export default class Migracao extends React.Component {

    static defaultProps = {
        exibir: false,
        titulo: '',
        item: { 
            id: 0,
            descricao: ''
        }
    }

    state = { ...defaultState }

    getLista = () => {
        let lista = this.props.lista
        let listaAux = [ <div className={ 'migracao-menu-item-vazio' }>{ 'LISTA VAZIA' }</div> ]

        if (!!lista) {
            listaAux = []

            for (let indice = 0; indice < lista.length; indice++) {
                if (lista[indice].id === this.props.item.id) {
                    continue
                }

                listaAux.push(<div className={ 'migracao-menu-item ' + (this.state.item.id === lista[indice].id ? 'migracao-menu-item-selecionado' : '') } onClick={ () => this.onClickItem(lista[indice]) }>{ lista[indice].id + ' - ' + lista[indice].descricao }</div>)
            }
        }

        return listaAux
    }

    onClickItem = (item) => {
        this.setState({ item })
    }

    eventoSim = async () => {
        await this.props.eventos.sim(this.state.item)
        this.setState({ ...defaultState })
        this.props.eventos.fechar()
    }

    render() {
        return ( 
            <Modal
                titulo={ 'MIGRAÇÃO ' }
                destaque={ this.props.titulo }
                exibir={ this.props.exibir }
                eventoFechar={ this.props.eventos.fechar }
            >       
                <div className='migracao-menu-texto-base'>
                    <div className='migracao-menu-texto'>
                        { 'MIGRAR ' } <b> { this.props.item.id + ' - ' + this.props.item.descricao.toUpperCase() } </b> { ' PARA' }
                        <b> { this.state.item.id + ' - ' + this.state.item.descricao.toUpperCase() } </b>                          
                    </div>
                </div>
                {
                    !!this.props.lista &&
                    <>
                        <div className='migracao-menu-lista-separador'/>
                        <div className='migracao-menu-lista-base'>
                            <div className='migracao-menu-lista'>
                                { this.getLista() }
                            </div>
                        </div>
                    </>
                }
                <div className='migracao-menu-lista-separador'/>
                <BotaoRecepiente>
                    <Botao
                        tipo={ BotaoTipo.NAO }
                        onClick={ this.props.eventos.fechar }
                    />
                    <Botao
                        ativo={ this.state.item.id > 0 }
                        tipo={ BotaoTipo.SIM }
                        onClick={ this.eventoSim }
                    />
                </BotaoRecepiente>
            </Modal>
        )
    }

}