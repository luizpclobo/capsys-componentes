import React from 'react'

import { AiFillCloseCircle } from '@react-icons/all-files/ai/AiFillCloseCircle'

import './Selecionador.css'

const itemVazio = { id: 0, descricao: 'NADA SELECIONADO' }

export default class Selecionador extends React.Component {

    state = {
        aberto: false,
        lista: [],
        item: itemVazio,
        valido: false,
    }

    montarLista = () => {
        let lista = this.props.itens
        let listaAux = [<div className={ 'selecionador-menu-item ' + (this.state.item.id === itemVazio.id ? 'selecionador-menu-item-selecionado' : '') } onClick={ () => this.eventoCliqueItem(itemVazio) }>{ itemVazio.id + ' - ' + itemVazio.descricao }</div>]

        if (!!lista) {
            for (let indice = 0; indice < lista.length; indice++) {
                listaAux.push(<div className={ 'selecionador-menu-item ' + (this.state.item.id === lista[indice].id ? 'selecionador-menu-item-selecionado' : '') } onClick={ () => this.eventoCliqueItem(lista[indice]) }>{ lista[indice].id + ' - ' + lista[indice].descricao }</div>)
            }
        }

        this.setState({ lista: listaAux })
    }

    getClassNameCampo = () => {
        return (
            'selecionador-campo ' +
            (!!this.state.item.id ? 'selecionador-campo-com-descricao' : 'selecionador-campo-sem-descricao')
        )
    }

    getClassNameSelecionador = () => {
        return (
            'selecionador ' +
            (!this.state.valido ? 'selecionador-nao-valido' : '')
        )        
    }

    getItem = (id) => {
        let item = itemVazio

        if (!!id && id > 0) {   
            let lista = this.props.itens
            let encontrou = false

            for (let indice = 0; indice < lista.length; indice++) {
                item = lista[indice]
                encontrou = (parseInt(item.id) === parseInt(id))
                
                if (encontrou) {
                    break
                }
            }

            if (!encontrou) {
                item = itemVazio
            }
        }

        return item
    }
    
    eventoAlteracaoValor = (item) => {
        let itemTemp = item

        if (!itemTemp) {
            itemTemp = this.getItem(this.props.valor) 
        }

        let itemAux = { id: itemTemp.id, descricao: itemTemp.id + ' - ' + itemTemp.descricao }

        if (itemAux.id !== this.state.item.id) {
            this.setState({ item: itemAux })

            if (!!this.props.eventoAlteracao) {
                this.props.eventoAlteracao(itemAux)
            }
        }
    }

    eventoCliqueItem = (item) => {
        this.setState({ aberto: false })
        this.eventoAlteracaoValor(item)
    }

    eventoSair = (evento) => {
        if (!!this.props.eventoSair) {
            this.props.eventoSair(evento)
        }
    }

    eventoEntrada = (evento) => {
        evento.target.value = evento.target.value.toUpperCase()
    }

    eventoFechar = () => {
        this.setState({ aberto: false })
    }

    eventoValidar = () => {
        if (!!this.props.eventoValidar) {
            let validoAux = !!this.props.eventoValidar(this.state.item.id)

            if (validoAux !== this.state.valido) {
                this.setState({ valido: validoAux })
            }
        }
    }

    render() {
        this.eventoAlteracaoValor()
        this.eventoValidar()

        return (            
            <div className='selecionador-base'>
                <div className={ this.getClassNameCampo() }>
                    {
                        !!this.state.item.id  &&
                        <label className='selecionador-campo-descricao'>{ this.props.descricao }</label>
                    }
                    <input
                        className={ this.getClassNameSelecionador() }
                        autofocus={ this.props.focoInicial }
                        readOnly={ true }
                        placeholder={ !this.state.item.id && this.props.descricao }
                        value={ !!this.state.item.id ? this.state.item.descricao : '' }
                        eventoSair={ this.eventoSair }
                        eventoEntrada={ this.eventoEntrada }
                        onClick={ () => { 
                            let aberto = !this.state.aberto

                            if (!!aberto) {
                                this.montarLista()
                            }

                            this.setState({ aberto })
                        }}
                    />
                    {
                        !!this.state.aberto &&
                        <div className='selecionador-menu-fundo'>
                            <div className='selecionador-menu' >
                                <div className='selecionador-menu-cabecalho'>
                                    <div className='selecionador-menu-cabecalho-descricao-base'>
                                        <label>SELECIONE <label className='selecionador-menu-cabecalho-descricao'>{ this.props.descricao.toUpperCase() }</label></label>
                                    </div>
                                    <div><AiFillCloseCircle className='selecionador-menu-cabecalho-fechar' onClick={ this.eventoFechar }/></div>
                                </div>
                                <div className='selecionador-menu-lista-base'>
                                    <div className='selecionador-menu-lista'>
                                        { this.state.lista }
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>  
        )
    }

}