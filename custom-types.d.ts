interface ReactProps {
  className?: string;
  key?: any;
  // children?: any;
  style?: React.CSSProperties;
}

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

// export enum ActionsEnum {
//   VIEW = "VIEW",
//   EDIT = "EDIT",
//   DELETE = "DELETE",
//   RESTORE = "RESTORE",
//   DELETE_FOREVER = "DELETE_FOREVER",
//   CHANGE_STATUS = "CHANGE_STATUS",
//   DIVIDER = "DIVIDER",
//   APPROVE = "APPROVE",
//   REJECT = "REJECT",
//   PENDING = "PENDING",
//   CANCEL = "CANCEL",
// }

type Variants = 'primary' | 'positive' | 'negative' | 'secondary' | 'blank' | 'link';
