const { randomInt } = require('crypto');
const prompt = require('prompt-sync')();

const victoriasPosibles = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 7, 9],
    [1, 5, 9],
    [7, 5, 3]
]

function imprimirTablero(tablero) {
    console.log(`
        |${tablero[1]}|${tablero[2]}|${tablero[3]}|
        |${tablero[4]}|${tablero[5]}|${tablero[6]}|
        |${tablero[7]}|${tablero[8]}|${tablero[9]}|
    `)
}

function verificarFinPartida(tablero) {
    for (let i = 0; i < victoriasPosibles.length; i++) {
        const config = victoriasPosibles[i];
        if (tablero[config[0]] == tablero[config[1]] && tablero[config[1]] == tablero[config[2]] && tablero[config[1]] != '_') {
            return true
        }
    }
    return false
}

function crearNuevaPartida() {
    return {
        "tablero": {
            1: "_",
            2: "_",
            3: "_",
            4: "_",
            5: '_',
            6: '_',
            7: '_',
            8: '_',
            9: '_'
        },
        "jugadorActivo": 'o',
        "ganador": false,
        "termino": false
    }
}

function comenzarPartida() {
    process.on('SIGINT', () => {
        return
    });
    console.log('TIC TAC TOE')
    console.log(`
    |1|2|3|
    |4|5|6|
    |7|8|9|
    `)

    let partida = crearNuevaPartida()
    while (!partida.termino) {
        partida.tablero = hacerJugada(partida.tablero, partida.jugadorActivo)
        imprimirTablero(partida.tablero)
        partida.termino = verificarFinPartida(partida.tablero)
        if (partida.termino) partida.ganador = partida.jugadorActivo
        // Lo ultimo que hacemos es pasar el turno al otro jugador
        partida.jugadorActivo = partida.jugadorActivo == 'o' ? 'x' : 'o'
        console.log("jugadorActivo", partida.jugadorActivo)
    }
    console.log('TIC TAC TOE')
    console.log(`FELICITACIONES ${partida.ganador} GANO`)
    imprimirTablero(partida.tablero)
}


function obtenerJugadas(tablero) {
    console.log
    let jugadas = []
    for (let indice in tablero) {
        if(tablero[indice] == '_') jugadas.push(indice)
    }
    return jugadas
}


function hacerJugada(tablero, jugador) {
    // obtener jugadas disponibles
    const jugadas = obtenerJugadas(tablero)
    // determinar cual es la mejor de todas
    // el criterio es aquella jugada que complete o nos acerque 
    // a completar una de las listas en victoriasPosibles
    let movimiento;
    if (jugador == 'x') {
        movimiento = determinarMovimientoMaquina(tablero, jugadas)
    } else {
        movimiento = determinarMovimientoHumano(tablero)
    }

    // ejecutarla
    tablero[movimiento] = jugador
    return tablero
}

function determinarMovimientoHumano(tablero) {
    let movimiento = false
    while (!movimiento) {
        let candidatoMovimiento = prompt('Cual es tu movimiento?');
        if (candidatoMovimiento == 'q') process.exit();
        const candidato = parseInt(candidatoMovimiento)
        if (!(candidato > 0 && candidato <= 9)) {
            console.log('Introdujo un numero de celda invalido, debe ser entre 0  y 9')
            continue
        }
        if (tablero[candidato] == '_') movimiento = candidato
        else {
            console.log("esta celda ya esta ocupada")
            continue
        }
    }
    console.log("turno persona", movimiento)
    return movimiento
}

function determinarMovimientoMaquina(tablero, jugadas) {
    console.log("jugadas: ", jugadas)
    const movimiento = jugadas[Math.floor(Math.random()*jugadas.length)]
    console.log("turno maquina", movimiento)
    return movimiento
}




comenzarPartida()