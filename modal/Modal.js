import React from 'react'

import { AiFillCloseCircle } from '@react-icons/all-files/ai/AiFillCloseCircle'

import './Modal.css'

export default class Modal extends React.Component {

    static defaultProps = {
        exibir: false,
        titulo: '',
        destaque: '',
        eventoFechar: () => {}
    }

    state = {
        aberto: false,
    }

    onClose = () => {
        this.setState({ aberto: false })
    }

    render() {
        return (            
            !!this.props.exibir &&
            <div className='modal-menu-fundo'>
                <div className='modal-menu'>
                    <div className='modal-menu-cabecalho'>
                        <div className='modal-menu-cabecalho-titulo-base'>
                            <label className='modal-menu-cabecalho-titulo'>
                                { this.props.titulo.toUpperCase() } 
                                <label className='modal-menu-cabecalho-titulo-destaque'>{ this.props.destaque.toUpperCase() }</label>
                            </label>
                        </div>
                        <div><AiFillCloseCircle className='modal-menu-cabecalho-fechar' onClick={ this.props.eventoFechar }/></div>
                    </div>
                    { this.props.children }
                </div>
            </div>
        )
    }

}