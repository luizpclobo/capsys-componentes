import React from 'react'

import Menu from '../../../navegacao/menu'

import './Cabecalho.css'

const Cabecalho = () => (
    <header className='cabecalho'>
        <Menu/>
        <div className='cabecalho-logo'></div>
    </header>
)

export default Cabecalho