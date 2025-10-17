export type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
}
