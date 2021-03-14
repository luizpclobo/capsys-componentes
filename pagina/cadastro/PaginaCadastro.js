import React from 'react'

import Pagina from '../Pagina'
import Opcao from '../opcao'

import Mensagem from '../../mensagem'
import Migracao from '../../migracao'
import Notificacao from '../../notificacao'

export default class PaginaCadastro extends React.Component {

    render = () => {
        let controlador = this.props.controlador

        controlador.eventoLocalizar() 

        return (
            <Pagina localizacao={ this.props.localizacao }>
                <Mensagem { ...controlador.getMensagem() }/>
                <Migracao { ...controlador.getMigracao() }/>
                <Notificacao/>
                { this.props.children }
                <Opcao 
                    botoes={{ 
                        excluir: { ativo: !!controlador.getEstado().localizadoPorId },
                        salvar: { ativo: true } 
                    }} 
                    eventos={ { ...controlador.getEventos(), ...this.props.eventos } }
                />
            </Pagina>
        )
    }

}