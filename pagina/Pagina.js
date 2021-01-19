import React from 'react'

import Cabecalho from './cabecalho'
import Recipiente from './recipiente'
// import Rodape from './pagina/rodape'

export default class Pagina extends React.Component {
    
    render() {
        return (
            <>
                <Cabecalho/>
                <Recipiente>
                    { this.props.children }
                </Recipiente>
                {/* <Rodape/> */}
            </>
        )
    }

}