import { useEffect, useState } from "react";
import { bringDate, formatDate, formatTime } from '../services/FormatDate'

export default function useTaskStatus(conclusion, dayOf) {

    const [taskInfo, setTaskInfo] = useState(null)

    useEffect(() => {
        if (conclusion) {
            setTaskInfo({
                'message': 'Concluída',
                'color': 'success'
            })
        } else {
            if (dayOf) {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const [ano, mes, dia] = bringDate(dayOf)
                const day_of = new Date(ano, mes, dia)
                if (today.getTime() === day_of.getTime()) {
                    setTaskInfo({
                        'message': 'Hoje às ' + formatTime(dayOf),
                        'color': 'warning'
                    })
                } else if (today.getTime() > day_of.getTime()) {
                    setTaskInfo({
                        'message': 'Atrasado: ' + formatDate(dayOf),
                        'color': 'danger'
                    })
                } else {
                    setTaskInfo(null)
                }
            } else {
                setTaskInfo(null)
            }

        }
    }, [conclusion, dayOf])

    return { taskInfo }
}