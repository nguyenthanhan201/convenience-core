export default function useCopy() {
  return (text: string) => {
    navigator.clipboard.writeText(text);
  };
}
