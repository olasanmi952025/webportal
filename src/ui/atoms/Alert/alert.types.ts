export type AlertsProps = {
  isOpen: boolean;
  onClose: () => void
  textDescription: string
  labelConfirm?: string
  labelDismiss?: string
  onHandleConfirm: () => void

}