export const devMode = 'true'
export const defaultLogin = ''
export const defaultPwd = ''
// export const baseUrl = 'https://localhost:7067'
export const baseUrl = 'https://api.smartbug.meetweb.com.br'

export const mediaIcon = {
  image: '📷 Foto',
  audio: '🎵 Áudio',
  video: '🎥 Vídeo',
}

export const deliveryStatusStyledClass = {
  queued: 'mi mi-icon_timer col-msg-entregue v-a-middle',
  sending: '',
  sent: 'mi mi-icon_done col-msg-entregue v-a-middle',
  failed: 'mi mi-icon_cancel col-msg-lida v-a-middle',
  delivered: 'mi mi-icon_done_all col-msg-entregue v-a-middle',
  undelivered: '',
  receiving: 'mi mi-icon_done_all col-msg-entregue v-a-middle',
  received: 'mi mi-icon_done_all col-msg-entregue v-a-middle',
  accepted: 'mi mi-icon_done col-msg-entregue v-a-middle',
  scheduled: '',
  read: 'mi mi-icon_done_all col-msg-lida v-a-middle',
  partiallyDelivered: '',
  canceled: '',
}

export const deliveryStatus = {
  queued: 'queued',
  sending: 'sending',
  sent: 'sent',
  failed: 'failed',
  delivered: 'delivered',
  undelivered: 'undelivered',
  receiving: 'receiving',
  received: 'received',
  accepted: 'accepted',
  scheduled: 'scheduled',
  read: 'read',
  partiallyDelivered: 'partiallyDelivered',
  canceled: 'canceled',
}

export const channel = {
  internalChat: 1,
  whatsApp: 2,
  sms: 3,
  messenger: 4,
  instagram: 5,
  telegram: 6,
}

export const whatsAppProviders = [
  // a ordem aqui é de aparição no combobox
  // mas os valores continuam os mesmos
  { value: 1, label: 'T-API' },
  { value: 0, label: 'Meta - WhatsApp' },
  { value: 2, label: 'Meta - Facebook Messenger' },
  { value: 3, label: 'Meta - Facebook Instagram' },
]

export const userConnectionStatusOptions = {
  offline: {
    text: 'Offline',
    color: '#e3e3e3',
  },
  online: {
    text: 'Online',
    color: '#1d7235',
  },
  disponivel: {
    text: 'Disponivel',
    color: '#1e8e3e',
  },
  indisponivel: {
    text: 'Indisponivel',
    color: '#af3a3a',
  },
}

export const userConnectionStatusList = [
  {
    value: 1,
    label: 'Offline',
  },
  {
    value: 2,
    label: 'Online',
  },
  {
    value: 3,
    label: 'Disponivel',
  },
  {
    value: 4,
    label: 'Indisponivel',
  },
]

export const menuOptionWhatsAppList = [
  {
    id: 1,
    value: 'salvarContato',
    label: 'Gerenciar Contato',
    class: 'chatMenuOptionsNormal',
    icon: 'PermContactCalendarIcon',
    tooltip: 'Consultar/Salvar as informações deste Contato na Agenda',
  },
  {
    id: 2,
    value: 'mostrarInfosExtras',
    label: 'Mostrar informações extras',
    class: 'chatMenuOptionsNormal',
    icon: 'ContactsIcon',
    tooltip: 'Mostrar informações extras colhidas pelo Bot',
  },
  {
    id: 3,
    value: 'historico',
    label: 'Histórico do Contato',
    class: 'chatMenuOptionsNormal',
    icon: 'AssignmentIcon',
    tooltip: 'Carregar histórico de mensagens de atendimentos anteriores',
  },
  {
    id: 4,
    value: 'historicoNotas',
    label: 'Histórico de Anotações do Cliente',
    class: 'chatMenuOptionsNormal',
    icon: 'NotesIcon',
    tooltip: 'Carregar histórico de anotações de atendimentos anteriores',
  },
  {
    id: 5,
    value: 'adicionarAtendente',
    label: 'Adicionar novo atendente ao chat',
    class: 'chatMenuOptionsNormal',
    icon: 'PersonAddIcon',
    tooltip: 'Adiciona um novo usuário à esta conversa',
  },
  {
    id: 6,
    value: 'transferir',
    label: 'Transferir Atendimento',
    class: 'chatMenuOptionsNormal',
    icon: 'PhoneForwardedIcon',
    tooltip: 'Transferir o atendimento atual para uma fila de serviço ou para outro atendente',
  },
  {
    id: 7,
    value: 'reiniciarAtendimento',
    label: 'Reiniciar Atendimento',
    class: 'chatMenuOptionsNormal',
    icon: 'UpdateIcon',
    tooltip: 'Reiniciar Atendimento',
  },
  {
    id: 8,
    value: 'encerrarSilenciosamente',
    label: 'Encerrar Atendimento Sem Notificação',
    class: 'chatMenuOptionsWarning',
    icon: 'CallEndIcon',
    tooltip: 'Encerrar atendimento sem enviar mensagem ao cliente',
  },
  {
    id: 9,
    value: 'encerrar',
    label: 'Encerrar Atendimento Com Notificação',
    class: 'chatMenuOptionsDanger',
    icon: 'CallEndIcon',
    tooltip: 'Encerrar atendimento enviando mensagem ao cliente informando o fim',
  },
]

export const menuOptionMonitoringList = [
  {
    id: 1,
    value: 'mostrarInfosExtras',
    label: 'Mostrar informações extras',
    class: 'chatMenuOptionsNormal',
    icon: 'ContactsIcon',
    tooltip: 'Mostrar informações extras colhidas pelo Bot',
  },
  {
    id: 2,
    value: 'transferir',
    label: 'Transferir Atendimento',
    class: 'chatMenuOptionsNormal',
    icon: 'PhoneForwardedIcon',
    tooltip: 'Transferir o atendimento atual para uma fila de serviço ou para outro atendente',
  },
  {
    id: 3,
    value: 'historico',
    label: 'Histórico do Contato',
    class: 'chatMenuOptionsNormal',
    icon: 'AssignmentIcon',
    tooltip: 'Carregar histórico de mensagens de atendimentos anteriores',
  },
  {
    id: 4,
    value: 'enviarMensagem',
    label: 'Enviar Mensagem ao Cliente',
    class: 'chatMenuOptionsNormal',
    icon: 'CommentIcon',
    tooltip: 'Enviar mensagem ao cliente deste atendimento.',
  },
  {
    id: 5,
    value: 'encerrarSilenciosamente',
    label: 'Encerrar Atendimento Sem Notificação',
    class: 'chatMenuOptionsWarning',
    icon: 'CallEndIcon',
    tooltip: 'Encerrar atendimento sem enviar mensagem ao cliente',
  },
  {
    id: 6,
    value: 'encerrar',
    label: 'Encerrar Atendimento Com Notificação',
    class: 'chatMenuOptionsDanger',
    icon: 'CallEndIcon',
    tooltip: 'Encerrar atendimento enviando mensagem ao cliente informando o fim',
  },
]

export const menuOptionInternalChatList = [
  {
    id: 1,
    value: 'Apagar',
    label: 'Encerrar Conversa',
    class: 'chatMenuOptionsDanger',
    icon: 'ClearIcon',
    tooltip: 'Encerrar conversa limpando as mensagens',
  },
]

export const profileList = [
  { value: 1, label: 'Administrador' },
  { value: 2, label: 'Supervisor' },
  { value: 3, label: 'Atendente' },
]

export const HistoryType = [
  { value: 0, label: 'Empresa' },
  { value: 1, label: 'Fila de Serviço' },
]
export const stateList = [
  { value: false, label: 'INATIVO' },
  { value: true, label: 'ATIVO' },
]

export const stateGroupedQueue = [
  { value: false, label: 'DESAGRUPAR' },
  { value: true, label: 'AGRUPAR' },
]

export const customStyles = {
  input: {
    width: '100%',
    padding: '0 1.5rem',
    height: '3.7rem',
    borderRadius: '0.25rem',
    fontWeight: '400',
    fontSize: '1.5rem',
  },

  label: {
    color: '#455a64',
    marginBottom: '5px',
    fontFamily: 'Raleway-Regular',
    fontSize: '14px',
  },

  fileUpload: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
    cursor: 'pointer',
  },

  miCard: {
    background: '#fff',
    boxShadow: '0 1px 5px rgb(0 0 0 / 0%)',
    position: 'relative',
    marginBottom: '30px',
    borderRadius: '2px',
    height: '143px',
    border: '1px solid #cccccc',
    width: '100%',
    margin: 'auto',
    minHeight: '143px',
  },

  miCardContent: {
    maxHeight: '140px',
    overflowY: 'auto',
    paddingTop: '2px',
    paddingLeft: '5px',
    paddingRight: '0px',
  },
  
}

export const i18nEmojiMartPtBrTranslation = {
  search: 'Pesquisa',
  clear: 'Limpar', // Accessible label on "clear" button
  notfound: 'Nenhum Emoji encontrado',
  skintext: 'Selecione o seu tom de pele padrão',
  categories: {
    search: 'Resultados da pesquisa',
    recent: 'Usados frequentemente',
    smileys: 'Smileys e emotion',
    people: 'Smileys e pessoas',
    nature: 'Animais e natureza',
    foods: 'Comidas e bebidas',
    activity: 'Atividades',
    places: 'Viagens e lugares',
    objects: 'Objetos',
    symbols: 'Símbolos',
    flags: 'Bandeiras',
    custom: 'Customizados',
  },
  categorieslabel: 'Categorias de Emoji', // Accessible title for the list of categories
  skintones: {
    1: 'Tom de pele padrão',
    2: 'Tom de pele claro',
    3: 'Tom de pele meio claro',
    4: 'Tom de pele médio',
    5: 'Tom de pele meio escuro',
    6: 'Tom de pele escuro',
  },
}

export const mimeTypes = {
  // https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types
  allImages: 'image/jpeg, image/png',
  allVideos: 'video/mp4, video/3gp',
  allAudios: 'audio/aac, audio/mp4, audio/mpeg, audio/amr, audio/ogg; opus codecs',
  imagesAndVideos: 'image/jpg,image/jpeg,image/png, video/mp4, video/3gp',
  allDocuments:
    'text/plain, text/csv, application/pdf, application/vnd.ms-powerpoint, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const sleep = async (time:any) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}

export const generateColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  // Converter a cor hexadecimal para uma array de componentes RGB
  const rgb = [
    parseInt(color.slice(1, 3), 16),
    parseInt(color.slice(3, 5), 16),
    parseInt(color.slice(5, 7), 16),
  ];

  // Verificar se pelo menos um dos componentes é escuro (valor <= 95)
  const hasDarkComponent = rgb.some(component => component <= 95);

  // Se todos os componentes são claros, escurecer aleatoriamente um deles
  if (!hasDarkComponent) {
    const darkComponentIndex = Math.floor(Math.random() * 3);
    rgb[darkComponentIndex] = Math.floor(rgb[darkComponentIndex] * 95 / 255);
    color = `#${rgb.map(component => component.toString(16).padStart(2, '0')).join('')}`;
  }

  return color;
}

export const jsonToString = (obj:any) => {
  return JSON.stringify(obj, null, 2)
}
