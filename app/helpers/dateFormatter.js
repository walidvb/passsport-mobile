const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function dateToString(date){
  return `${days[date.getDay()-1]} ${date.getDate()} ${months[date.getMonth()-1]} ${date.getFullYear()}`
}
