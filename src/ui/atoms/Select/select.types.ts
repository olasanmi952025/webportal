type Option = {
  label: string
  value: string
}

export type SelectProps = {
  options: Option[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  searchable?: boolean
  variant?: "default" | "outlined" | "shadow"
  className?: string
  style?: React.CSSProperties
  id?: string
  hasError?: boolean
  ariaLabel?: string
}
