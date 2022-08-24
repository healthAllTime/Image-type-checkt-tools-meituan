import { imageBufferHeaders  } from "./bufferTable"

function readBuffer(file) { 
    return new Promise((resolve, reject) => { 
        const reader = new FileReader(); 
        reader.onload = () => { 
        resolve(reader.result); 
        }; 
        reader.onerror = reject; 
        reader.readAsArrayBuffer(file); 
    }); 
}

function getImageimgSuffix(fileBuffer) {
    for (const imageBufferHeader of imageBufferHeaders) {
      let isEqual
      if (imageBufferHeader.bufferHeader) {
        const buf = Buffer.from(imageBufferHeader.bufferHeader)
        isEqual = buf.equals(
          fileBuffer.slice(0, imageBufferHeader.bufferHeader.length)
        )
      }
      if (isEqual && imageBufferHeader.bufEnd) {
        const buf = Buffer.from(imageBufferHeader.bufEnd)
        isEqual = buf.equals(fileBuffer.slice(-imageBufferHeader.bufEnd.length))
      }
      if (isEqual) {
        return imageBufferHeader.imgSuffix
      }
    }
    return ''
}

export async function JudgeImageType(file){
    const fileBuffer =  await readBuffer();
    return getImageimgSuffix(fileBuffer);
}