import React from 'react'

import { NotificationContainer, NotificationManager } from 'react-notifications'

import 'react-notifications/lib/notifications.css'

import NotificacaoTipo from './NotificacaoTipo'
 
export default class Notificacao extends React.Component {

    mensagemTecnica = ''

    static criar = (tipo, mensagem, mensagemTecnica = '', timeOut = 3000) => (new Notificacao()).gerar(tipo, mensagem, mensagemTecnica, timeOut)

    getMensagemTecnica = () => {
        if (!!this.mensagemTecnica) {
            alert(this.mensagemTecnica)
        }
    }

    gerar = (tipo, mensagem, mensagemTecnica, timeOut) => {
        this.mensagemTecnica = mensagemTecnica

        switch (tipo) {
            case NotificacaoTipo.INFORMACAO:
                NotificationManager.info(mensagem, 'INFORMAÇÃO', timeOut, this.getMensagemTecnica)
                break
            case NotificacaoTipo.SUCESSO:
                NotificationManager.success(mensagem, 'SUCESSO', timeOut, this.getMensagemTecnica)
                break
            case NotificacaoTipo.AVISO:
                NotificationManager.warning(mensagem, 'ATENÇÃO', timeOut, this.getMensagemTecnica)
                break
            case NotificacaoTipo.FALHA:
                NotificationManager.error(mensagem, 'FALHA', timeOut, this.getMensagemTecnica)
            break
        }
    }

    render() {
        return (
            <NotificationContainer/>
        )
    }

}