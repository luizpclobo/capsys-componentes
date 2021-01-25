import React from 'react'

import DataHoraUtil from '../../../util/DataHoraUtil'

export default class Cadastro extends React.Component {

    state = {
        dados: {},
        eventoObterDados: {
            executado: false, 
            dados: {},
        },
        localizar: true,
        localizadoPorId: false,
    }
    
    rgn = null
    objetoVazio = {}

    constructor(props, rgn, objeto) {
        super(props)

        this.rgn = rgn
        this.objetoVazio = objeto
    }

    getDados = () => this.state.dados

    getLista = async (rgn) => {
        let itens = await rgn.localizarTodos()
        let lista = []

        if (!!itens) {
            for (let indice = 0; indice < itens.length; indice++) {
                const item = itens[indice]
                
                lista.push({ id: item.id, descricao: item.descricao })
            }
        }

        return lista
    }

    getListaDados = (chave) => {
        let dadosEvento = this.state.eventoObterDados.dados
        let lista = []

        if (!!dadosEvento && !!dadosEvento[chave]) {
            lista = dadosEvento[chave]
        }

        return lista
    }

	onChangeId = (id) => {
        let dados = this.objetoVazio
        dados.id = id
		this.setState({ dados })	
	}

	onChange = (campo, valor) => {
        let dados = this.state.dados
        dados[campo] = valor
		this.setState({ dados })	
	}

	eventoPesquisar = async (id) => {	
        let idAux = !id ? this.state.dados.id : id
        let dados = await this.rgn.localizar({ id: idAux })
        let localizadoPorId = false

		if (!dados) {
            dados = { id: idAux }
        } else {
            if (!!dados.dataexclusao) {
                let reincluir = window.confirm('Registro ' + dados.id + ' - ' + dados.descricao + ' excluído dia ' + DataHoraUtil.dataFormatada(dados.dataexclusao) + '. Deseja reincluí-lo?')

                if (!reincluir) {
                    dados = { id: idAux }
                } else {
                    localizadoPorId = true
                }
            } else {
                localizadoPorId = true
            }
        }

		this.setState({ dados, localizadoPorId })
    }
    
    eventoLocalizar = () => {
        if (!this.state.localizar) {
            return
        }

        this.setState({ localizar: false })
        this.eventoPesquisar(this.props.id)
    }
    
    eventoObterDados = async (eventos) => {
        if (!!this.state.eventoObterDados.executado) {
            return
        }

        this.setState({ eventoObterDados: { executado: true } })

        let dadosEventos = {}

        for (let indice = 0; indice < eventos.length; indice++) {
            const evento = eventos[indice];
            
            let dados = await evento.executar()

            dadosEventos[evento.chave] = dados
        }

        this.setState({ eventoObterDados: { dados: dadosEventos, executado: true } })
    }

	eventoSalvar = async () => {
        await this.rgn.salvar(this.state.dados)
    }

    eventoAposSalvar = () => {
        this.setState({ dados: this.objetoVazio })
    }

}