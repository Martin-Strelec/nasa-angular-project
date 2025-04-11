export interface EPIC {
  identifier: string
  caption: string
  image: string
  version: string
  centroid_coordinates: CentroidCoordinates
  dscovr_j2000_position: DscovrJ2000Position
  lunar_j2000_position: LunarJ2000Position
  sun_j2000_position: SunJ2000Position
  attitude_quaternions: AttitudeQuaternions
  date: string
  coords?: string
  imageUrl: string
  loaded: boolean
  error: boolean
}

export interface CentroidCoordinates {
  lat: number
  lon: number
}

export interface DscovrJ2000Position {
  x: number
  y: number
  z: number
}

export interface LunarJ2000Position {
  x: number
  y: number
  z: number
}

export interface SunJ2000Position {
  x: number
  y: number
  z: number
}

export interface AttitudeQuaternions {
  q0: number
  q1: number
  q2: number
  q3: number
}