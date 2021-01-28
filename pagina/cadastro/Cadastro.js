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
        idGeradoAutomaticamente: false,
    }
    
    rgn = null
    objetoVazio = {}

    constructor(props, rgn) {
        super(props)

        this.rgn = rgn
    }

    getEstado = () => this.state

    getDados = () => this.state.dados
    
    setDados = (dados) => this.setState({ dados }) 

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

    setListaDados = (lista, chave) => {
        let dadosEvento = this.state.eventoObterDados.dados

        if (!!dadosEvento && !!dadosEvento[chave]) {
            dadosEvento[chave] = lista

            this.setState({ eventoObterDados: { ...this.state.eventoObterDados, dados: dadosEvento } })
        }
    }

    atualizarListaDados = async (rgn, chave) => {
        let lista = await this.getLista(rgn)
        this.setListaDados(lista, chave)
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
        let dados = await this.rgn.localizarPorId({ id: idAux })
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
        
        return localizadoPorId
    }

    eventoLocalizarProximoId = async () => {
        let dados = await this.rgn.localizarProximoId()

        if (!!dados) {
            this.setState({ dados: { id: dados.id }, idGeradoAutomaticamente: true })        
        }
    }
    
    eventoLocalizar = (localizarProximoId = true) => {
        if (!this.state.localizar) {
            return
        }

        this.setState({ localizar: false })

        if (!!this.props.id) {
            this.eventoPesquisar(this.props.id)
        } else if (!!localizarProximoId) {
            this.eventoLocalizarProximoId()
        }
    }
    
    eventoObterDados = async (eventos) => {
        if (!!this.state.eventoObterDados.executado) {
            return
        }

        this.setState({ eventoObterDados: { executado: true } })

        let dadosEventos = {}

        for (let indice = 0; indice < eventos.length; indice++) {
            const evento = eventos[indice]
            
            let dados = await this.getLista(evento.rgn)

            dadosEventos[evento.chave] = dados
        }

        this.setState({ eventoObterDados: { dados: dadosEventos, executado: true } })
    }

	eventoSalvar = async () => {
        return await this.rgn.salvar(this.state.dados)
    }

    eventoAposSalvar = () => {
    }

	eventoExcluir = async () => {
        await this.rgn.deletar(this.state.dados)
    }

    eventoAposExcluir = () => {
        this.setState({ dados: this.objetoVazio })
    }

    getEventos = () => {
        return {
            eventoSalvar: this.eventoSalvar,
            eventoAposSalvar: this.eventoAposSalvar,
            eventoExcluir: this.eventoExcluir,
            eventoAposExcluir: this.eventoAposExcluir,
        }
    }

}