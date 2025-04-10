export interface PhotoRoot {
    photos: RoverPhoto[]
  }
  
  export interface RoverPhoto {
    id: number
    sol: number
    camera: Camera
    img_src: string
    earth_date: string
  }
  
  export interface Camera {
    id: number
    name: string
    rover_id: number
    full_name: string
  }
  
  export interface RoverRoot {
    photo_manifest: PhotoManifest
  }
  
  export interface PhotoManifest {
    name: string
    landing_date: string
    launch_date: string
    status: string
    max_sol: number
    max_date: string
    total_photos: number
    photos: Photo[]
  }
  
  export interface Photo {
    sol: number
    earth_date: string
    total_photos: number
    cameras: string[]
  }
  