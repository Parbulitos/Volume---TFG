import ImageKit from 'imagekit';

export const useImageKit = () => {
    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Simplificar la definición del tipo del evento
            reader.onload = (event) => {
                const result = reader.result as string; // Directamente usar reader.result
                if (result) {
                    const base64String = result.split(',')[1];
                    resolve(base64String);
                } else {
                    reject('No se pudo leer el archivo como Base64.');
                }
            };

            reader.onerror = (event) => {
                reject(event);
            };

            // Leer el archivo como Data URL
            reader.readAsDataURL(file);
        });
    }
    const uploadImage = async (file: File) => {
        //const auth = await fetch(/api/imagekit/getauthparameters).then((res) => res.json());
        let avatarUrl = '';
        const imagekit = new ImageKit({
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
            privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || '',
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL || '',
        });
        const file64 = await fileToBase64(file);
        const result = await imagekit.upload({
            file: file64, //required
            fileName: file.name, //required
        });
        return result.url;
    };
    return {
        uploadImage,
    };
};
