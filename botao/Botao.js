import React from 'react'

import './Botao.css'

export default class Botao extends React.Component {

    render() {
        return (
            <div className='botao-base'>
                <div className={ 'botao-campo' }>
                    <input
                        className={ 'botao-input' }
                        type='submit'
                        autofocus={ this.props.focoInicial }
                        value={ this.props.descricao }
                    />
                </div>
            </div>   
        )
    }

}