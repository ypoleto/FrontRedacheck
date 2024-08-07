import moment from 'moment';


export const getHoraFormatada = (data) => {
        return moment(data).format('DD/MM/YYYY HH:mm');
    }