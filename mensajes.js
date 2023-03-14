async function enviarMensaje(destino, mensaje) {
    form1 = '521'
    form2 = '@c.us'
    numeroEnvio = destino;
    numenvio = form1 + numeroEnvio + form2
    const url = 'https://api.green-api.com/waInstance1101799583/SendMessage/3cac3305ab02448ab5a0b5a62934c508a70f37b70d2a490aaa'
    const data = {
        chatId: numenvio,
        message: mensaje
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
        } else {
            throw new Error('Error en la llamada a la API')
            console.log(response)
        }
    } catch (error) {
        console.error(error)
    }
}



const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', (e) => e.preventDefault());
formulario.addEventListener('submit', async (event) => {
    event.preventDefault()

    const chatId = document.getElementById('destino').value
    const mensaje = document.getElementById('mensaje').value

    try {
        const response = await enviarMensaje(chatId, mensaje)
        alert('Orden enviada')
        console.log(response)
    } catch (error) {
        alert('Orden no enviada')
        console.error(error)
    }
})
