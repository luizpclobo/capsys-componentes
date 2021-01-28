import React from 'react'
import { Link } from 'react-router-dom'

import { DataGrid } from '@material-ui/data-grid'

import './PaginaLista.css'

import Pagina from '../Pagina'
import Acao from '../acao'

export default class PaginaLista extends React.Component {

    state = {
        colunas: [],
        linhas: [],
        carregandoGrid: true,
    }

    excluir = async (id) => {
        let deletar = window.confirm(this.props.getMensagemExclusao(id))
        
        if (!!deletar) {
            await this.props.rgn.deletar({ id })
            
            let linhas = this.state.linhas
            let linhasAux = []

            for (let indice = 0; indice < linhas.length; indice++) {
                if (linhas[indice].id === id) {
                    continue
                }

                linhasAux.push(linhas[indice])
            }

            this.setState({ linhas: linhasAux })
        }
    }

    montarColunas = () => {
        this.setState({ colunas: [] })

        let colunasProps = this.props.grid.colunas

        let colunas = [{
            // headerClassName: 'grid-cabecalho', 
            field: 'id', 
            headerName: this.props.grid.descricaoId, 
            width: 100, 
            renderCell: (params) => (
                <>
                    <Link className='grid-item grid-item-id' to={ this.props.caminhoCadastro + params.value }>
                        { params.value }
                    </Link>
                </>
            ),
        },]

        for (let indice = 0; indice < colunasProps.length; indice++) {
            const coluna = colunasProps[indice];
            
            colunas.push({
                // headerClassName: 'grid-cabecalho',
                field: coluna.campo,
                headerName: coluna.descricao,
                flex: 10, 
            },)
        }

        this.setState({ colunas })
    }

    montarLinhas = async () => {
        this.setState({ linhas: [], carregandoGrid: true })
        
        let linhas = await this.props.rgn.localizarDadosGrid()

        if (!linhas) {
            linhas = []
        }

        this.setState({ linhas, carregandoGrid: false })
    }

    montarGrid = () => {
        this.setState({ carregandoGrid: true })
        this.montarColunas()
        this.montarLinhas()
        this.setState({ carregandoGrid: false })
    }

    componentDidMount() {
        this.montarGrid()
    }

    render() {
        return (
            <>
                <Pagina localizacao={ this.props.localizacao }>
                    <Acao eventoAtualizar={ this.montarLinhas } caminhoCadastro={ this.props.caminhoCadastro } />
                    <div className='grid'>
                        <DataGrid rows={ this.state.linhas } columns={ this.state.colunas } pageSize={5} density={'comfortable'} disableColumnMenu loading={ this.state.carregandoGrid }/>
                        {/* { () => GridVeiculos(this.state.linhas, this.state.colunas) } */}
                    </div>
                </Pagina>
            </>
        )
    }

}