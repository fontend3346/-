// emits
export interface Emits {
  (event: 'click', e: MouseEvent): void
}

// props
export interface Props {
  options: Array<object>,
  waveTitle: string,
  infos:String,
  infoTitle:String
}
