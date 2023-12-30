function useCopy() {
  return (text: string) => {
    navigator.clipboard.writeText(text);
  };
}

export { useCopy };
