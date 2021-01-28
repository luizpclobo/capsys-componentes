import React from 'react'

import './CaixaSelecao.css'

const itemVazio = { id: 0, descricao: 'NADA SELECIONADO' }

export default class CaixaSelecao extends React.Component {

    state = {
        mostrarLista: false,
        lista: [],
        item: itemVazio,
    }

    montarLista = () => {
        let lista = this.props.itens
        let listaAux = [<div className='caixaselecao-menu-item' onClick={ () => this.onClickItem(itemVazio) }>{ itemVazio.id + ' - ' + itemVazio.descricao }</div>]

        if (!!lista) {
            for (let indice = 0; indice < lista.length; indice++) {
                listaAux.push(<div className='caixaselecao-menu-item' onClick={ () => this.onClickItem(lista[indice]) }>{ lista[indice].id + ' - ' + lista[indice].descricao }</div>)
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
        }
    }

    onClickItem = (item) => {
        this.setState({ mostrarLista: false })

        this.onChangeValor(item)

        if (!!this.props.onChange) {
            this.props.onChange(item)
        }
    }

    onBlur = (evento) => {
        // this.setState({ mostrarLista: false })

        if (!!this.props.onBlur) {
            this.props.onBlur(evento)
        }
    }

    onInput = (evento) => {
        evento.target.value = evento.target.value.toUpperCase()
    }

    render() {
        this.onChangeValor()

        return (            
            <div className='caixaselecao-base'>
                <div className={ 'caixaselecao-campo ' + (!!this.state.item.id ? 'caixaselecao-campo-com-descricao' : 'caixaselecao-campo-sem-descricao') }>
                    {
                        !!this.state.item.id  &&
                        <label className='caixaselecao-campo-descricao'>{ this.props.descricao }</label>
                    }
                    <input
                        className='caixaselecao'
                        autofocus={ this.props.focoInicial }
                        readOnly={ true }
                        placeholder={ !this.state.item.id && this.props.descricao }
                        value={ !!this.state.item.id ? this.state.item.descricao : '' }
                        onBlur={ this.onBlur }
                        onInput={ this.onInput }
                        onClick={ () => { 
                            let mostrarLista = !this.state.mostrarLista

                            if (!!mostrarLista) {
                                this.montarLista()
                            }

                            this.setState({ mostrarLista })
                        } }
                    />
                    {
                        !!this.state.mostrarLista &&
                        <div className='caixaselecao-menu-base'>
                            <div className='caixaselecao-menu'>
                                { this.state.lista }
                            </div>
                        </div>
                    }
                </div>
            </div>  
        )
    }

}