import React from 'react'

import DataHoraUtil from '../../../util/DataHoraUtil'

import Notificacao from '../../notificacao'
import NotificacaoTipo from '../../notificacao/NotificacaoTipo'

export default class ControladorCadastro extends React.Component {

    state = {
        dados: {},
        eventoInicial: { 
            executado: true
        },
        eventoObterDados: {
            executado: false, 
            dados: {},
        },
        eventos: {},
        localizar: true,
        localizadoPorId: false,
        idGeradoAutomaticamente: false,
        mensagem: {
            exibir: false,
            eventos: {},
        },
        migracao: {
            exibir: false,
            eventos: {},
        },
    }
    
    rgn = null
    objetoVazio = null

    constructor(props, rgn, objetoVazio) {
        super(props)

        this.rgn = rgn
        this.objetoVazio = objetoVazio
    }

    getControlador = () => {
        return this
    }

    getEstado = () => this.state
    
    setDados = (dados) => this.setState({ dados }) 

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

    setListaDados = (lista, chave) => {
        let dadosEvento = this.state.eventoObterDados.dados
        dadosEvento[chave] = lista
        this.setState({ eventoObterDados: { ...this.state.eventoObterDados, dados: dadosEvento } })
    }

    getListaDados = (chave) => {
        let dadosEvento = this.state.eventoObterDados.dados
        let lista = []

        if (!!dadosEvento && !!dadosEvento[chave]) {
            lista = dadosEvento[chave]
        }

        return lista
    }

    getEventos = () => {
        return {
            salvar: this.eventoSalvar,
            excluir: this.eventoExcluir,
            aposExcluir: this.eventoAposExcluir,        
        }
    }

    setMensagem = (mensagem) => {
        this.setState({ mensagem })
    }

    getMensagem = () => {
        return { 
            ...this.state.mensagem,
            eventos: {
                ...this.state.mensagem.eventos,
                fechar: () => this.setMensagem({ exibir: false })
            }
        }
    }

    setMigracao = (migracao) => {
        this.setState({ migracao })
    }

    getMigracao = () => {
        return { 
            ...this.state.migracao,
            eventos: {
                ...this.state.migracao.eventos,
                fechar: () => this.setMigracao({ exibir: false })
            }
        }
    }

    atualizarListaDados = async (rgn, chave) => {
        let lista = await this.getLista(rgn)
        this.setListaDados(lista, chave)
    }

	onChangeId = (id) => {
        let dados = this.objetoVazio
        dados.id = id
		this.setState({ dados, localizadoPorId: false })	
	}

	onChange = (campo, valor) => {
        let dados = this.state.dados
        dados[campo] = valor
		this.setState({ dados })	
    }

	eventoPesquisar = async (id) => {	

        let idAux = !id ? this.state.dados.id : id
        let dados = await this.rgn.localizarPorId({ id: idAux })

        let localizadoPorId = !!dados

		if (!localizadoPorId) {
            dados = { id: idAux }
        } else {
            if (!!dados.dataexclusao) {
                localizadoPorId = false

                let texto = <label>REGISTRO <b>{ dados.id + ' - ' + dados.descricao }</b> EXCLUÍDO DIA <b>{ DataHoraUtil.dataFormatada(dados.dataexclusao) }</b>.</label>
                let pergunta = <label>DESEJA REINCLUÍ-LO?</label>
                let observacao = <label>APÓS REINCLUIR DEVERÁ SER SALVO.</label>

                this.setMensagem({ 
                    exibir: true, 
                    titulo: 'ATENÇÃO', 
                    texto, 
                    pergunta, 
                    observacao,
                    eventos: {
                        nao: () => this.eventoLocalizarProximoId(),
                        sim: () => this.setMensagem({ exibir: false }),
                    }
                })
            }
        }

        this.setState({ dados, localizadoPorId })
    }

    eventoLocalizarProximoId = async () => {
        let dados = await this.rgn.localizarProximoId()

        if (!!dados) {
            this.setState({ dados: { id: dados.id }, idGeradoAutomaticamente: true })        
        }
    }
    
    eventoLocalizar = async (localizarProximoId = true) => {
        if (!this.state.localizar) {
            return
        }

        this.setState({ localizar: false })

        if (!!this.props.id) {
            await this.eventoPesquisar(this.props.id)
        } else if (!!localizarProximoId) {
            await this.eventoLocalizarProximoId()
        }
    }

    eventoInicial = async () => {
        if (!!this.state.eventoInicial.executado) {
            return
        }

        this.setState({ 
            eventoInicial: { executado: true },
        })
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
        let dados = await this.rgn.salvar(this.state.dados)

        let notificacaoTipo = NotificacaoTipo.SUCESSO
        let mensagem = 'SALVO COM SUCESSO.'

        if (!dados) {
            notificacaoTipo = NotificacaoTipo.FALHA
            mensagem = 'FALHA AO SALVAR.'
        }

        Notificacao.criar(notificacaoTipo, mensagem)

        return dados
    }

	eventoExcluir = async () => {
        let dados = await this.rgn.deletar(this.state.dados)

        let notificacaoTipo = NotificacaoTipo.SUCESSO
        let mensagem = 'EXCLUÍDO COM SUCESSO.'

        if (!dados) {
            notificacaoTipo = NotificacaoTipo.FALHA
            mensagem = 'FALHA AO EXCLUIR.'
        }

        Notificacao.criar(notificacaoTipo, mensagem)

        return dados        
    }

    eventoAposExcluir = async () => {
        this.setState({ dados: this.objetoVazio })
        return true
    }

    eventoMigrar = async (titulo, item, eventoSim) => {
        let dados = await this.rgn.localizarTodos() 
            
        this.setMensagem({ exibir: false }) 

        this.setMigracao({ 
            exibir: true,
            titulo, 
            item,
            lista: dados,
            eventos: {
                sim: (novoItem) => eventoSim(item, novoItem),
            }
        })
    }

    eventoDeletar = async () => {

        let dados = await this.eventoExcluir()

        if (!!dados) {
            await this.eventoAposExcluir()
        }

        this.setMensagem({ exibir: false })
    }

}