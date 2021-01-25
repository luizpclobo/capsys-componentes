import React from 'react'
import { Link } from 'react-router-dom'

import { DataGrid } from '@material-ui/data-grid'

import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye'
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { AiFillCloseCircle } from '@react-icons/all-files/ai/AiFillCloseCircle'
import { AiFillPlusCircle } from '@react-icons/all-files/ai/AiFillPlusCircle'
import { IoReloadCircleSharp } from '@react-icons/all-files/io5/IoReloadCircleSharp'

import './PaginaLista.css'

import Pagina from '../Pagina'

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
        let colunas = [{ headerClassName: 'grid-cabecalho', field: 'id', headerName: this.props.grid.descricaoId, width: 100, },]

        for (let indice = 0; indice < colunasProps.length; indice++) {
            const coluna = colunasProps[indice];
            
            colunas.push({ headerClassName: 'grid-cabecalho', field: coluna.campo, headerName: coluna.descricao, flex: 10, },)
        }

        colunas.push({
            headerClassName: 'grid-cabecalho', 
            field: 'idAux',
            headerName: 'AÇÃO',
            headerAlign: 'center',
            width: 150,
            renderCell: (params) => (
                <>
                    <Link className='grid-item grid-item-acao grid-item-acao-visualizar' to={ this.props.caminhoCadastro + params.value }>
                        <AiFillEye/>
                    </Link>
                    <Link className='grid-item grid-item-acao grid-item-acao-editar' to={ this.props.caminhoCadastro + params.value }>
                        <AiFillEdit/>
                    </Link>
                    <div className='grid-item grid-item-acao grid-item-acao-excluir' onClick={() => this.excluir(params.value)}><AiFillCloseCircle/></div>
                </>
            ),
        },)

        this.setState({ colunas })
    }

    montarLinhas = async () => {
        this.setState({ linhas: [], carregandoGrid: true })
        let linhas = await this.props.rgn.localizarTodos()

        let listaAux = []

        if (!!linhas && linhas.length > 0) {
            for (let indice = 0; indice < linhas.length; indice++) {
                listaAux.push({ idAux: linhas[indice].id, ...linhas[indice] })
            }
        }

        this.setState({ linhas: listaAux, carregandoGrid: false })
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
                    <div className='acao'>
                        <div className='acao-item acao-item-atualizar' onClick={ this.montarLinhas }><IoReloadCircleSharp/></div>
                        <Link className='acao-item acao-item-adicionar' to={ this.props.caminhoCadastro }>
                            <AiFillPlusCircle/>
                        </Link>
                    </div>
                    <div className='grid'>
                        <DataGrid rows={ this.state.linhas } columns={ this.state.colunas } pageSize={5} density={'comfortable'} disableColumnMenu loading={ this.state.carregandoGrid }/>
                        {/* { () => GridVeiculos(this.state.linhas, this.state.colunas) } */}
                    </div>
                </Pagina>
            </>
        )
    }

}