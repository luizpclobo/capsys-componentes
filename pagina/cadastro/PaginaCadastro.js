import React from 'react'

import Pagina from '../Pagina'
import Opcao from '../opcao'

export default class PaginaCadastro extends React.Component {

    render = () => {
        return (
            <Pagina localizacao={ this.props.localizacao }>
                { this.props.children }
                <Opcao eventos={ this.props.eventos }/>
            </Pagina>
        )
    }

}