// emits
export interface Emits {
  (event: 'click', e: MouseEvent): void
}

// props
export interface Props {
  options: Array<object>,
  className: string,
  chartType: string,
}
