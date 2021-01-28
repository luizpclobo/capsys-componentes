import React from 'react'
import { Link } from 'react-router-dom'

import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle'
import { IoReloadCircleSharp } from '@react-icons/all-files/io5/IoReloadCircleSharp'

import './Acao.css'

export default class Acao extends React.Component {

    render() {
        return (
            <div className='acao'>
                <div className='acao-item'>
                    <div className='acao-item-atualizar' onClick={ this.props.eventoAtualizar }><IoReloadCircleSharp/></div>
                </div>
                <div className='acao-item'>
                    <Link className='acao-item-adicionar' to={ this.props.caminhoCadastro }>
                        <AiFillPlusCircle/>
                    </Link>
                </div>
            </div>
        )
    }

}