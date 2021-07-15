export function formatDate(timestamp, input = null) {
    const allDate = new Date(timestamp)
    const dia = allDate.getDate() > 10 ? allDate.getDate() : "0" + allDate.getDate()
    const mes = (allDate.getMonth() + 1) > 10 ? allDate.getMonth() + 1 : "0" + (allDate.getMonth() + 1)
    const ano = allDate.getFullYear() > 1000 ?
        allDate.getFullYear() :
        allDate.getFullYear() > 99 ?
            "0" + allDate.getFullYear() :
            allDate.getFullYear() > 9 ?
                "00" + allDate.getFullYear() :
                "000" + allDate.getFullYear()
    if (input)
        return ano + "-" + mes + "-" + dia
    return dia + "/" + mes + "/" + ano
}

export function formatTime(timestamp) {
    const allTime = new Date(timestamp)
    const hora = allTime.getHours() > 10 ? allTime.getHours() : "0" + allTime.getHours()
    const minuto = allTime.getMinutes() > 10 ? allTime.getMinutes() : "0" + allTime.getMinutes()
    return hora + ":" + minuto
}

export function makeDate(day, time) {
    if (day.trim() === '' || time.trim() === '') {
        return null
    }
    return day + "T" + time
}