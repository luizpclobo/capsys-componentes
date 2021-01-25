import React from 'react'

import './CaixaSelecao.css'

const itemVazio = { id: -1, descricao: '' }

export default class CaixaSelecao extends React.Component {

    state = {
        mostrarLista: false,
        lista: [],
        item: itemVazio,
    }

    montarLista = () => {
        let lista = this.props.itens
        let listaAux = []

        if (!!lista) {
            for (let indice = 0; indice < lista.length; indice++) {
                listaAux.push(<div className='caixaselecao-menu-item' onClick={ () => this.onClickItem(lista[indice]) }>{ lista[indice].id + ' - ' + lista[indice].descricao }</div>)
            }
        }

        this.setState({ lista: listaAux })
    }

    getItem = (id) => {
        let item = itemVazio

        if (!!id) {   
            let lista = this.props.itens

            for (let indice = 0; indice < lista.length; indice++) {
                item = lista[indice]
                
                if (item.id === id) {
                    break
                }
            }
        }

        return item
    }
    
    onChangeValor = (item) => {
        let itemTemp = item

        if (!itemTemp) {
            itemTemp = this.getItem(this.props.valor) 
        }

        let descricao = itemTemp.id >= 0 ? itemTemp.id + ' - ' + itemTemp.descricao : ''

        let itemAux = { id: itemTemp.id, descricao }

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
                <div className={ 'caixaselecao-campo ' + (this.state.item.id >= 0 ? 'caixaselecao-campo-com-descricao' : 'caixaselecao-campo-sem-descricao') }>
                    {
                        this.state.item.id >= 0  &&
                        <label className='caixaselecao-campo-descricao'>{ this.props.descricao }</label>
                    }
                    <input
                        className='caixaselecao'
                        autofocus={ this.props.focoInicial }
                        readOnly={ true }
                        placeholder={ this.state.item.id < 0 && this.props.descricao }
                        value={ this.state.item.descricao }
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