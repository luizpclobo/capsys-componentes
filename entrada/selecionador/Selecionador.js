import React from 'react'

import { AiFillCloseCircle } from '@react-icons/all-files/ai/AiFillCloseCircle'

import './Selecionador.css'

const itemVazio = { id: 0, descricao: 'NADA SELECIONADO' }

export default class Selecionador extends React.Component {

    state = {
        aberto: false,
        lista: [],
        item: itemVazio,
    }

    montarLista = () => {
        let lista = this.props.itens
        let listaAux = [<div className={ 'selecionador-menu-item ' + (this.state.item.id === itemVazio.id ? 'selecionador-menu-item-selecionado' : '') } onClick={ () => this.onClickItem(itemVazio) }>{ itemVazio.id + ' - ' + itemVazio.descricao }</div>]

        if (!!lista) {
            for (let indice = 0; indice < lista.length; indice++) {
                listaAux.push(<div className={ 'selecionador-menu-item ' + (this.state.item.id === lista[indice].id ? 'selecionador-menu-item-selecionado' : '') } onClick={ () => this.onClickItem(lista[indice]) }>{ lista[indice].id + ' - ' + lista[indice].descricao }</div>)
            }
        }

        this.setState({ lista: listaAux })
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
    
    onChangeValor = (item) => {
        let itemTemp = item

        if (!itemTemp) {
            itemTemp = this.getItem(this.props.valor) 
        }

        let itemAux = { id: itemTemp.id, descricao: itemTemp.id + ' - ' + itemTemp.descricao }

        if (itemAux.id !== this.state.item.id) {
            this.setState({ item: itemAux })

            if (!!this.props.onChange) {
                this.props.onChange(itemAux)
            }
        }
    }

    onClickItem = (item) => {
        this.setState({ aberto: false })
        this.onChangeValor(item)
    }

    onBlur = (evento) => {
        if (!!this.props.onBlur) {
            this.props.onBlur(evento)
        }
    }

    onInput = (evento) => {
        evento.target.value = evento.target.value.toUpperCase()
    }

    onClose = () => {
        this.setState({ aberto: false })
    }

    render() {
        this.onChangeValor()

        return (            
            <div className='selecionador-base'>
                <div className={ 'selecionador-campo ' + (!!this.state.item.id ? 'selecionador-campo-com-descricao' : 'selecionador-campo-sem-descricao') }>
                    {
                        !!this.state.item.id  &&
                        <label className='selecionador-campo-descricao'>{ this.props.descricao }</label>
                    }
                    <input
                        className='selecionador'
                        autofocus={ this.props.focoInicial }
                        readOnly={ true }
                        placeholder={ !this.state.item.id && this.props.descricao }
                        value={ !!this.state.item.id ? this.state.item.descricao : '' }
                        onBlur={ this.onBlur }
                        onInput={ this.onInput }
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
                                    <div><AiFillCloseCircle className='selecionador-menu-cabecalho-fechar' onClick={ this.onClose }/></div>
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