import CryptoJS from 'crypto-js';
const superDupper = '@M_m_i_41_00_96_87_!'

export const saveAuth = (auth: any) => {
  const crypted = CryptoJS.AES.encrypt(auth, superDupper)
  localStorage.setItem('Auth', crypted.toString())
}

export const getAuth = () => {
  const auth = localStorage.getItem('Auth')
  if (auth) {
    const decrypted = CryptoJS.AES.decrypt(auth, superDupper)
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
  return ''
}

export const DeleteAuth = () => {
  localStorage.removeItem('Auth')
  localStorage.removeItem('Avatar')
  localStorage.removeItem('Empreendimento')
}


export const saveAvatar = (avatar: string) => {
  localStorage.setItem('Avatar', avatar)
}

export const getAvatar = () => {
  const avatar = localStorage.getItem('Avatar')

  return avatar
}

export const saveSelectedEmpreendimento = (empreendimento:any) => {
  const crypted = CryptoJS.AES.encrypt(JSON.stringify(empreendimento), superDupper)
  localStorage.setItem('Empreendimento', crypted.toString())
}

export const getSelectedEmpreendimento = () => {
  const cryptedEmpreendimento = localStorage.getItem('Empreendimento')
  if (cryptedEmpreendimento) {
    const decrypted = CryptoJS.AES.decrypt(cryptedEmpreendimento, superDupper)
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  }
  return null
}

export const getSelectedEmpreendimentoId = () => {
  const enterprise = getSelectedEmpreendimento()
  return enterprise?.value
}















