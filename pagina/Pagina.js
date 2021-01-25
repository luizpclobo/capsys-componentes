import React from 'react'

import Cabecalho from './cabecalho'
import Localizacao from './localizacao'
import Recipiente from './recipiente'
// import Rodape from './pagina/rodape'

export default class Pagina extends React.Component {
    
    render() {
        return (
            <>
                <Cabecalho/>
                <Localizacao { ...this.props.localizacao }/>
                <Recipiente>
                    { this.props.children }
                </Recipiente>
                {/* <Rodape/> */}
            </>
        )
    }

}