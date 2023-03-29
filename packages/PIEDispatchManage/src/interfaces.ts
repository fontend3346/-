
// emits
export interface Emits {
  (event: 'workTickets', e: MouseEvent): void
  (event: 'fileModal', e: MouseEvent): void
  (event: 'imagesModal', e: MouseEvent): void
  (event: 'sizeChange', e: MouseEvent): void
  (event: 'pageChange', e: MouseEvent): void
}

// props
export interface Props {
  dispatchMainList: any;
  detailShowList: any;
  activeIndex: any;
  dispatchMainTitle: any;
  stepsInfo: any;
  total: any;
}
