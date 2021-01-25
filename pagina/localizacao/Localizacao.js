import React from 'react'

import { AiOutlineArrowRight } from '@react-icons/all-files/ai/AiOutlineArrowRight'

import './Localizacao.css'

import { Link } from 'react-router-dom'

export default class Localizacao extends React.Component {

    state = {
        lista: []
    }

    montarLista = async () => {
        this.setState({ lista: [] })

        let listaAux = []

        let listaDescricao = this.props.descricao
        let listaLocal = this.props.local

        let quantidade = !!listaLocal ? listaLocal.length : 0 

        if (quantidade > 0) {
            for (var indice = 0; indice < quantidade; indice++) {
                listaAux.push(
                    <>
                        <Link className='localizacao-local' to={ '/' +  listaLocal[indice] }>
                            <label className='localizacao-descricao'>{ listaDescricao[indice] }</label>
                        </Link>
                        {
                            (
                                indice + 1 > quantidade ||
                                indice + 1 < quantidade
                            ) &&
                            <label className='localizacao-separador'><AiOutlineArrowRight/></label>
                        }
                    </>
                )
            }
        }

        this.setState({ lista: listaAux })
    }

    componentDidMount() {
        this.montarLista()
    }

    render() {
        return (
            <div className='localizacao'>
                { this.state.lista }
            </div>
        )
    }

}