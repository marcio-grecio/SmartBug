import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { getAuth } from '../Repository/AuthRepo';
import { baseUrl } from '../Utils/GlobalConstantes';
import { errorLog, infoLog } from '../Utils/Logger';

let lastDisconnectedTime: Date | null = null;

export const configureHub = (
    handleUserConnectionStatus: (status: string, arg1: boolean, arg2: boolean, message: string, arg3: boolean, level: string) => void,
    _handleUserConnectionClose: (message: string) => void
): HubConnection | undefined => {
    try {
        const url = `${baseUrl}/Hubs/SignalHub`;

        return new HubConnectionBuilder()
            .withUrl(url, { accessTokenFactory: () => getAuth() })
            .configureLogging(LogLevel.Error)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (_) => {
                    const token = getAuth();
                    if (!!token) {
                        const newTimeOutInMilliseconds = Math.random() * 10000;
                        const newTimeOutInSeconds = Math.floor((newTimeOutInMilliseconds / 1000) % 60);
                        const alertMessage = `Falha na tentativa de reconexão! Nova tentativa em ${newTimeOutInSeconds} segundos.`;
                        handleUserConnectionStatus('offline', false, false, alertMessage, false, 'warning');

                        return newTimeOutInMilliseconds;
                    } else {
                        return null;
                    }
                },
            })
            .build();
    } catch (error) {
        errorLog('SignalRService -> configureHub: error', error);
    }
};

export const serverConnectionService = async (connection: HubConnection): Promise<number> => {
    try {
        await connection.start();
        infoLog('Conexão estabelecida com sucesso.');
        return 200;
    } catch (error: any) {
        // Verifique se o erro é o de "The connection was stopped during negotiation"
        if (error.message.includes("The connection was stopped during negotiation.")) {
            // Suprima este erro específico e tente reconectar
            setTimeout(() => connection.start(), 5000); // Tenta reconectar após 5 segundos
            return 500;
        } 
        
        // Log de outros erros
        if (error instanceof Error) {
            errorLog('Erro ao tentar conectar:', error.message);
        }
        
        return 500;
    }
};




export const onReconnectingService = (
    connection: HubConnection,
    handleUserConnectionStatus: (status: string, arg1: boolean, arg2: boolean, message: string, arg3: boolean, level: string) => void
): void => {
    connection.onreconnecting((error) => {
        lastDisconnectedTime = new Date();
        setTimeout(() => {
            if (connection.state !== 'Connected') {
                const alertMessage = 'Ocorreu uma perda da conexão com o servidor! Aguarde enquanto tentamos reestabelecer a conexão.';
                handleUserConnectionStatus('offline', false, true, alertMessage, false, 'warning');
            }
        }, 15000);
        errorLog(`Connection lost due to error "${error}". Trying to reconnect.`);
    });
};

export const onReconnectedService = (
    connection: HubConnection,
    handleUserConnectionStatus: (status: string, arg1: boolean, arg2: boolean, message: string, arg3: boolean, level: string) => void
): void => {
    connection.onreconnected(() => {
        const now = new Date();
        if (lastDisconnectedTime) {
            const downtime = now.getTime() - lastDisconnectedTime.getTime();
            if (downtime > 15000) {
                handleUserConnectionStatus('online', false, true, 'Conexão reestabelecida com sucesso!', false, 'success');
            }
        }
        lastDisconnectedTime = null;
    });
};