export function formatDate(date) {
    const allDate = new Date(date)
    const dia = allDate.getDate()
    const mes = allDate.getMonth() + 1
    const ano = allDate.getFullYear()
    return dia + "/" + mes + "/" + ano
}

export function formatTime(time) {
    const allTime = new Date(time)
    const hora = allTime.getHours()
    const minuto = allTime.getMinutes()
    return hora + ":" + minuto
}

export function backTime(date) {
    const allDate = new Date(date)
    const hora = allDate.getHours() > 10 ? allDate.getHours() : "0" + allDate.getHours()
    const minuto = allDate.getMinutes() > 10 ? allDate.getMinutes() : "0" + allDate.getMinutes()
    return hora + ":" + minuto
}

export function backDate(date) {
    const allDate = new Date(date)
    const dia = allDate.getDate() > 10 ? allDate.getDate() : "0" + allDate.getDate()
    const mes = (allDate.getMonth() + 1) > 10 ? allDate.getMonth() + 1 : "0" + (allDate.getMonth() + 1)
    const ano = allDate.getFullYear() > 1000 ?
        allDate.getFullYear() :
        allDate.getFullYear() > 99 ?
            "0" + allDate.getFullYear() :
            allDate.getFullYear() > 9 ?
                "00" + allDate.getFullYear() :
                "000" + allDate.getFullYear()
    return ano + "-" + mes + "-" + dia
}

export function makeDate(day, time) {
    if (day.trim() === '' || time.trim() === '') {
        return null
    }
    const timestamp = day + "T" + time
    return timestamp
}