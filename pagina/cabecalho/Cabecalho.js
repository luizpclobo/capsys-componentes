import React from 'react'

import Menu from '../../../navegacao/menu'
import Localizacao from '../localizacao'

import './Cabecalho.css'

export default class Cabecalho extends React.Component {

    render() {
        return (
            <header className='cabecalho'>
                <div className='cabecalho-menu'>
                    <Menu/>
                    <div className='cabecalho-menu-logo'></div>
                </div>
                <Localizacao { ...this.props.localizacao }/>
            </header>
        )
    }

}