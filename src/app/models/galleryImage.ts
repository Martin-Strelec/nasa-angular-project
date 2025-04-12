export interface GalleryImage {
    _id: string
    src: string
    date: string
}

export class NewGalleryImage implements GalleryImage {
    _id!: string
    src: string
    date: string

    constructor(src: string, date: string) {
        this.src = src
        this.date = date
    }
}