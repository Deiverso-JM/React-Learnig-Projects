import server from './server'
import colors from 'colors'

const port = process.env.PORT || 4000

server.listen(port, () => {
    return console.log('Puerto funcionando:', colors.green.bold(`${port}`))
})
