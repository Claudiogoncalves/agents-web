import dayjsLib from 'dayjs'
import 'dayjs/locale/pt-br'
import realtiveTime from 'dayjs/plugin/relativeTime'

dayjsLib.locale('pt-br')
dayjsLib.extend(realtiveTime)

export const dayjs = dayjsLib
