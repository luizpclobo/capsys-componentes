import React from 'react'

import DataHoraUtil from '../../../util/DataHoraUtil'

import Notificacao from '../../notificacao'
import NotificacaoTipo from '../../notificacao/NotificacaoTipo'

export default class ControladorCadastro extends React.Component {

    state = {
        dados: {},
        campos: {},
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
        let resposta = await rgn.localizarTodos()
        let dados = resposta.dados
        let lista = []

        if (!!resposta.situacao.sucesso) {
            for (let indice = 0; indice < dados.length; indice++) {
                const item = dados[indice]
                
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
                fechar: () => {
                    if (this.state.mensagem.eventos.fechar) {
                        this.state.mensagem.eventos.fechar()
                    }

                    this.setMensagem({ exibir: false })
                }
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

    setPerguntarDeletar = (item, descricao) => {
        this.setMensagem({ 
            exibir: true,
            titulo: 'ATENÇÃO',  
            texto: <label>DESEJA EXCLUIR { descricao } <b>{ item.id + (!!item.descricao ? ' - ' + item.descricao : '') }</b>?</label>, 
            eventos: {
                sim: () => this.eventoDeletar(),
            }
        })        
    }

    atualizarListaDados = async (rgn, chave) => {
        let lista = await this.getLista(rgn)
        this.setListaDados(lista, chave)
    }

	eventoAlteracaoId = (id) => {
        let dados = this.objetoVazio
        dados.id = id
		this.setState({ dados, localizadoPorId: false })	
	}

	eventoAlteracao = (campo, valor) => {
        let dados = this.state.dados
        dados[campo] = valor
		this.setState({ dados })	
    }

	eventoPesquisar = async (id) => {	
        let idAux = !id ? this.state.dados.id : id

        if (!idAux) {
            return false
        }

        let resposta = await this.rgn.localizarPorId({ id: idAux })

        let dados = resposta.dados
        let localizadoPorId = !!resposta.situacao.sucesso
        let localizado = localizadoPorId

		if (!localizadoPorId) {
            dados = { id: idAux }
        } else {
            if (!!dados.dataexclusao) {
                localizadoPorId = false

                let texto = <label>REGISTRO <b>{ dados.id + (!!dados.descricao ? ' - ' + dados.descricao : '') }</b> EXCLUÍDO DIA <b>{ DataHoraUtil.dataFormatada(dados.dataexclusao) }</b>.</label>
                let pergunta = <label>DESEJA REINCLUÍ-LO?</label>
                let observacao = <label>APÓS REINCLUIR DEVERÁ SER SALVO.</label>

                this.setMensagem({ 
                    exibir: true, 
                    titulo: 'ATENÇÃO', 
                    texto, 
                    pergunta, 
                    observacao,
                    eventos: {
                        sim: () => this.setMensagem({ exibir: false }),
                        fechar: () => {
                            this.eventoLocalizarProximoId()
                            this.setMensagem({ exibir: false })
                        },
                    }
                })
            }
        }

        this.setState({ dados, localizadoPorId })

        return localizado
    }

    eventoLocalizarProximoId = async () => {
        let resposta = await this.rgn.localizarProximoId()

        if (!!resposta.situacao.sucesso) {
            this.setState({ dados: { ...this.objetoVazio, id: resposta.dados.id }, idGeradoAutomaticamente: true })        
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
        let resposta = await this.rgn.salvar(this.state.dados)

        let notificacaoTipo = NotificacaoTipo.SUCESSO
        let mensagem = 'SALVO COM SUCESSO.'

        if (!resposta.situacao.sucesso ) {
            notificacaoTipo = NotificacaoTipo.FALHA
            mensagem = 'FALHA AO SALVAR.'
        }

        Notificacao.criar(notificacaoTipo, mensagem)

        return !!resposta.situacao.sucesso 
    }

	eventoExcluir = async () => {
        let resposta = await this.rgn.deletar(this.state.dados)

        let notificacaoTipo = NotificacaoTipo.SUCESSO
        let mensagem = 'EXCLUÍDO COM SUCESSO.'

        if (!resposta.situacao.sucesso) {
            notificacaoTipo = NotificacaoTipo.FALHA
            mensagem = 'FALHA AO EXCLUIR.'
        }

        Notificacao.criar(notificacaoTipo, mensagem)

        return !!resposta.situacao.sucesso        
    }

    eventoAposExcluir = async () => {
        this.setState({ dados: this.objetoVazio })
        return true
    }

    eventoMigrar = async (titulo, item, eventoSim) => {
        let resposta = await this.rgn.localizarTodos() 
            
        this.setMensagem({ exibir: false }) 

        this.setMigracao({ 
            exibir: true,
            titulo, 
            item,
            lista: resposta.dados,
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
    
    eventoValidar = (campo, valido) => {
        let campos = this.state.campos

        if (campos[campo] !== valido) {
            campos[campo] = valido
            this.setState({ campos })
        }

        return valido	
    }

    eventoValidarCampos = () => {
        let campos = this.state.campos
        let validos = JSON.stringify(campos) !== '{}'

        for (const campo in campos) {
            if (Object.hasOwnProperty.call(campos, campo)) {
                const valido = campos[campo]
                validos = validos && valido
            }
        }

        return validos
    }

}