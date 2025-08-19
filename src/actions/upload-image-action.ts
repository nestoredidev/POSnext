"use server"

export async function uploadImage(formdata: FormData): Promise<string> {
    const url = process.env.API_URL + '/products/upload-image'
    const req = await fetch(url, {
        method: 'POST',
        body: formdata
    })
    if (!req.ok) {
        throw new Error('Error al subir la imagen')
    }
    const image = await req.json()
    return image.secure_url
}